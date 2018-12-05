"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("jest");
const memoizer_1 = require("../../src/cache/memoizer");
jest.useFakeTimers();
const createMockCallback = rtnVal => ({
    apply: jest.fn().mockReturnValue(rtnVal)
});
const _logger = {
    info: jest.fn()
};
describe("Memoizer", () => {
    beforeEach(() => { });
    test("register - no options", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const memoizer = new memoizer_1.default(_logger);
        const mockCallback = createMockCallback("a");
        memoizer.register("cache1", mockCallback);
        yield expect(memoizer.get("cache1")).resolves.toEqual({
            data: "a",
            lastUpdated: expect.any(Date)
        });
        expect(mockCallback.apply).toHaveBeenCalledTimes(1);
    }));
    test("register - no options - register two items", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const memoizer = new memoizer_1.default(_logger);
        const mockCallback1 = createMockCallback("1");
        const mockCallback2 = createMockCallback("2");
        memoizer.register("cache1", mockCallback1);
        memoizer.register("cache2", mockCallback2);
        yield expect(memoizer.get("cache1")).resolves.toEqual({
            data: "1",
            lastUpdated: expect.any(Date)
        });
        expect(mockCallback1.apply).toHaveBeenCalledTimes(1);
        yield expect(memoizer.get("cache2")).resolves.toEqual({
            data: "2",
            lastUpdated: expect.any(Date)
        });
        expect(mockCallback2.apply).toHaveBeenCalledTimes(1);
    }));
    test("register - with options - no values", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const memoizer = new memoizer_1.default(_logger);
        const mockCallback = createMockCallback("1");
        memoizer.register("cache1", mockCallback, {});
        yield expect(memoizer.get("cache1")).resolves.toEqual({
            data: "1",
            lastUpdated: expect.any(Date)
        });
        expect(mockCallback.apply).toHaveBeenNthCalledWith(1, null, []);
    }));
    test("register - with options - no interval", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const memoizer = new memoizer_1.default(_logger);
        const mockCallback = createMockCallback("a");
        memoizer.register("cache1", mockCallback, {
            params: { arg1: "1", arg2: "2" }
        });
        yield expect(memoizer.get("cache1")).resolves.toEqual({
            data: "a",
            lastUpdated: expect.any(Date)
        });
        expect(mockCallback.apply).toHaveBeenNthCalledWith(1, null, []);
        expect(setInterval).not.toBeCalled();
    }));
    test("register - with options - with interval 1000 ms", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const memoizer = new memoizer_1.default(_logger);
        const mockCallback = createMockCallback("a");
        memoizer.register("cache1", mockCallback, { interval: 1000 });
        yield expect(memoizer.get("cache1")).resolves.toEqual({
            data: "a",
            lastUpdated: expect.any(Date)
        });
        expect(mockCallback.apply).toHaveBeenNthCalledWith(1, null, []);
        expect(setInterval).toHaveBeenNthCalledWith(1, expect.anything(), 1000);
    }));
    test("register - update immediate when specified", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const memoizer = new memoizer_1.default(_logger);
        const mockCallback = createMockCallback("a");
        memoizer.register("cache1", mockCallback, {
            interval: 1000,
            immediate: true
        });
        expect(mockCallback.apply).toHaveBeenNthCalledWith(1, null, []);
        expect(setInterval).toHaveBeenNthCalledWith(1, expect.anything(), 1000);
    }));
    test("update - throws when no cache exists", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const memoizer = new memoizer_1.default(_logger);
        yield expect(memoizer.get("non-existing-cache")).rejects.toEqual(new Error("Could not find the cache entry for 'non-existing-cache'. Did you forget to call register?"));
    }));
    test("get - with no params", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const memoizer = new memoizer_1.default(_logger);
        const mockCallback = createMockCallback("1");
        memoizer.register("cacheGet", mockCallback);
        yield expect(memoizer.get("cacheGet")).resolves.toEqual({
            data: "1",
            lastUpdated: expect.any(Date)
        });
        expect(mockCallback.apply).toHaveBeenNthCalledWith(1, null, []);
    }));
    test("get - with params", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const memoizer = new memoizer_1.default(_logger);
        const mockCallback = createMockCallback("1");
        memoizer.register("cacheGet", mockCallback, {
            params: { arg1: "arg1", arg2: "arg2" }
        });
        yield memoizer.get("cacheGet", { arg1: "arg1", arg2: "arg2" });
        expect(mockCallback.apply).toHaveBeenNthCalledWith(1, null, [
            "arg1",
            "arg2"
        ]);
        // second call - should get from the cache
        yield expect(memoizer.get("cacheGet", { arg1: "arg1", arg2: "arg2" })).resolves.toEqual({
            data: "1",
            lastUpdated: expect.any(Date)
        });
        expect(mockCallback.apply).not.toHaveBeenCalledTimes(2);
    }));
    test("get - with params, no corresponding cache exists", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const memoizer = new memoizer_1.default(_logger);
        const mockCallback = createMockCallback("a");
        memoizer.register("cacheGet", mockCallback);
        yield memoizer.get("cacheGet", { arg1: "arg1", arg2: "arg2" });
        expect(mockCallback.apply).toHaveBeenNthCalledWith(1, null, [
            "arg1",
            "arg2"
        ]);
        // second call - different params should update the cache
        yield memoizer.get("cacheGet", { arg1: "arg1", arg2: "arg3" });
    }));
    test("startUpdate sets setInterval", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const memoizer = new memoizer_1.default(_logger);
        const mockCallback = createMockCallback("a");
        memoizer.register("cache", mockCallback, {
            params: { arg1: "arg1" },
            interval: 1000
        });
        expect(setInterval).toHaveBeenNthCalledWith(1, expect.any(Function), 1000);
    }));
    test("startUpdate calls update at interval", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const memoizer = new memoizer_1.default(_logger);
        const mockCallback = createMockCallback("a");
        memoizer.register("cache", mockCallback, {
            params: { arg1: "arg1" },
            interval: 1000
        });
        jest.runOnlyPendingTimers();
        expect(mockCallback.apply).toBeCalled();
    }));
    test("subordinateCache gets deleted when masterCache updated", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const memoizer = new memoizer_1.default(_logger);
        const mockCallback = createMockCallback("a");
        memoizer.register("cache", mockCallback, {
            params: { arg1: "arg1" },
            interval: 1000
        });
        // make another variant call - this will create a subordinateCache.
        yield memoizer.get("cache", { arg1: "arg1", arg2: "arg2" });
        expect(mockCallback.apply).toHaveBeenCalledTimes(1);
        jest.runOnlyPendingTimers();
        expect(mockCallback.apply).toHaveBeenCalledTimes(2);
        // make the same variant call - the subordinateCache should have been deleted
        yield memoizer.get("cache", { arg1: "arg1", arg2: "arg2" });
        expect(mockCallback.apply).toHaveBeenCalledTimes(3);
    }));
});
//# sourceMappingURL=memoizer.spec.js.map