import "jest";
import Memoizer from "../../src/cache/memoizer";
import { Lib } from "../../src/types";

jest.useFakeTimers();

const createMockCallback = rtnVal =>
  <any>{
    apply: jest.fn().mockReturnValue(rtnVal)
  };
const _logger = <Lib.ILogger>(<any>{
  info: jest.fn()
});

describe("Memoizer", () => {
  beforeEach(() => {});

  test("register - no options", async () => {
    const memoizer = new Memoizer(_logger);
    const mockCallback = createMockCallback("a");
    memoizer.register("cache1", mockCallback);
    await expect(memoizer.get("cache1")).resolves.toEqual("a");
    expect(mockCallback.apply).toHaveBeenCalledTimes(1);
  });

  test("register - no options - register two items", async () => {
    const memoizer = new Memoizer(_logger);
    const mockCallback1 = createMockCallback("1");
    const mockCallback2 = createMockCallback("2");
    memoizer.register("cache1", mockCallback1);
    memoizer.register("cache2", mockCallback2);
    await expect(memoizer.get("cache1")).resolves.toEqual("1");
    expect(mockCallback1.apply).toHaveBeenCalledTimes(1);
    await expect(memoizer.get("cache2")).resolves.toEqual("2");
    expect(mockCallback2.apply).toHaveBeenCalledTimes(1);
  });

  test("register - with options - no values", async () => {
    const memoizer = new Memoizer(_logger);

    const mockCallback = createMockCallback("1");
    memoizer.register("cache1", mockCallback, <any>{});
    await expect(memoizer.get("cache1")).resolves.toEqual("1");
    expect(mockCallback.apply).toHaveBeenNthCalledWith(1, null, []);
  });

  test("register - with options - no interval", async () => {
    const memoizer = new Memoizer(_logger);
    const mockCallback = createMockCallback("a");
    memoizer.register("cache1", <any>mockCallback, {
      params: { arg1: "1", arg2: "2" }
    });
    await expect(memoizer.get("cache1")).resolves.toEqual("a");
    expect(mockCallback.apply).toHaveBeenNthCalledWith(1, null, []);
    expect(setInterval).not.toBeCalled();
  });

  test("register - with options - with interval 1000 ms", async () => {
    const memoizer = new Memoizer(_logger);
    const mockCallback = createMockCallback("a");
    memoizer.register("cache1", mockCallback, <any>{ interval: 1000 });
    await expect(memoizer.get("cache1")).resolves.toEqual("a");
    expect(mockCallback.apply).toHaveBeenNthCalledWith(1, null, []);
    expect(setInterval).toHaveBeenNthCalledWith(1, expect.anything(), 1000);
  });

  test("register - update immediate when specified", async () => {
    const memoizer = new Memoizer(_logger);
    const mockCallback = createMockCallback("a");
    memoizer.register("cache1", mockCallback, <any>{
      interval: 1000,
      immediate: true
    });
    expect(mockCallback.apply).toHaveBeenNthCalledWith(1, null, []);
    expect(setInterval).toHaveBeenNthCalledWith(1, expect.anything(), 1000);
  });

  test("update - throws when no cache exists", async () => {
    const memoizer = new Memoizer(_logger);
    await expect(memoizer.get("non-existing-cache")).rejects.toEqual(
      new Error(
        "Could not find the cache entry for 'non-existing-cache'. Did you forget to call register?"
      )
    );
  });

  test("get - with no params", async () => {
    const memoizer = new Memoizer(_logger);
    const mockCallback = createMockCallback("1");
    memoizer.register("cacheGet", mockCallback);
    await expect(memoizer.get("cacheGet")).resolves.toEqual("1");
    expect(mockCallback.apply).toHaveBeenNthCalledWith(1, null, []);
  });

  test("get - with params", async () => {
    const memoizer = new Memoizer(_logger);
    const mockCallback = createMockCallback("1");
    memoizer.register("cacheGet", mockCallback, {
      params: { arg1: "arg1", arg2: "arg2" }
    });

    await memoizer.get("cacheGet", { arg1: "arg1", arg2: "arg2" });
    expect(mockCallback.apply).toHaveBeenNthCalledWith(1, null, [
      "arg1",
      "arg2"
    ]);

    // second call - should get from the cache
    await expect(
      memoizer.get("cacheGet", { arg1: "arg1", arg2: "arg2" })
    ).resolves.toEqual("1");
    expect(mockCallback.apply).not.toHaveBeenCalledTimes(2);
  });

  test("get - with params, no corresponding cache exists", async () => {
    const memoizer = new Memoizer(_logger);
    const mockCallback = createMockCallback("a");
    memoizer.register("cacheGet", <any>mockCallback);

    await memoizer.get("cacheGet", { arg1: "arg1", arg2: "arg2" });
    expect(mockCallback.apply).toHaveBeenNthCalledWith(1, null, [
      "arg1",
      "arg2"
    ]);

    // second call - different params should update the cache
    await memoizer.get("cacheGet", { arg1: "arg1", arg2: "arg3" });
  });

  test("startUpdate - no interval throws exception", async () => {
    const memoizer = new Memoizer(_logger);
    const mockCallback = createMockCallback("a");
    memoizer.register("cache", <any>mockCallback, {
      params: { arg1: "arg1" }
    });

    await expect(memoizer.startUpdate("cache")).rejects.toEqual(
      new Error(
        "No interval was set for cache 'cache' with params: 'undefined'"
      )
    );
  });

  test("startUpdate sets setInterval", async () => {
    const memoizer = new Memoizer(_logger);
    const mockCallback = createMockCallback("a");
    memoizer.register("cache", <any>mockCallback, {
      params: { arg1: "arg1" },
      interval: 1000
    });
    await memoizer.startUpdate("cache", { arg1: "arg1" });
    expect(setInterval).toHaveBeenNthCalledWith(1, expect.any(Function), 1000);
  });

  test("startUpdate calls update at interval", async () => {
    const memoizer = new Memoizer(_logger);
    const mockCallback = createMockCallback("a");
    memoizer.register("cache", <any>mockCallback, {
      params: { arg1: "arg1" },
      interval: 1000
    });
    await memoizer.startUpdate("cache", { arg1: "arg1" });
    jest.runOnlyPendingTimers();
    expect(mockCallback.apply).toBeCalled();
  });
});
