import "jest";
// jest mock
const _mock_configuration = <IConfiguration>(<any>{
  getIPStackFetchURL: jest.fn().mockReturnValue("lookupServiceProvider.com"),
  getIPStackApiKey: jest.fn().mockReturnValue("API_KEY")
});
const _mock_logger = <Lib.ILogger>(<any>{
  info: jest.fn()
});
const _mock_dns_lookup_async = jest.fn().mockResolvedValue("192.21.23.44");
let _mock_bluebird_promisify = jest.fn();
jest.mock("dns", () => ({
  lookup: jest.fn()
}));
jest.mock("bluebird", () => ({
  promisify: _mock_bluebird_promisify,
  delay: jest.fn().mockResolvedValue(undefined)
}));
jest.mock("axios");
jest.useFakeTimers();

// import sut
import axios from "axios";
import { IConfiguration, Lib } from "../src/types";
import LocationClient from "../src/locationClient";

describe("LocationClient", () => {
  beforeEach(() => {});

  describe("getGeoInfo", () => {
    const setAxiosGetResolvedValue1 = value => {
      (<jest.Mock>(<any>axios.get)).mockResolvedValue({
        data: {
          country_code: value
        }
      });
    };
    const setAxiosGetResolvedValue2 = value => {
      (<jest.Mock>(<any>axios.get)).mockResolvedValueOnce({
        data: {
          country_code: ""
        }
      });
      (<jest.Mock>(<any>axios.get)).mockResolvedValueOnce({
        data: {
          country_code: value
        }
      });
    };
    const setAxiosGetResolvedValue3 = value => {
      (<jest.Mock>(<any>axios.get)).mockResolvedValueOnce({
        data: {
          country_code: ""
        }
      });
      (<jest.Mock>(<any>axios.get)).mockResolvedValueOnce({
        data: {
          country_code: ""
        }
      });
      (<jest.Mock>(<any>axios.get)).mockResolvedValueOnce({
        data: {
          country_code: value
        }
      });
    };
    const setAxiosGetResolvedValueNotFound = () => {
      (<jest.Mock>(<any>axios.get)).mockResolvedValueOnce({
        data: {
          country_code: ""
        }
      });
      (<jest.Mock>(<any>axios.get)).mockResolvedValueOnce({
        data: {
          country_code: ""
        }
      });
    };
    test("success - hello.com resolves with domain", async () => {
      _mock_bluebird_promisify.mockReset();
      _mock_bluebird_promisify.mockReturnValue(_mock_dns_lookup_async);
      setAxiosGetResolvedValue1("JP");
      const client = new LocationClient(_mock_logger, _mock_configuration);
      await expect(client.getGeoInfo("r.hello.com")).resolves.toEqual({
        country_code: "JP",
        domain: "r.hello.com"
      });
    });
    test("success - hello.com resolves with ip", async () => {
      _mock_bluebird_promisify.mockReset();
      _mock_bluebird_promisify.mockReturnValue(_mock_dns_lookup_async);
      setAxiosGetResolvedValue2("JP");
      const client = new LocationClient(_mock_logger, _mock_configuration);
      await expect(client.getGeoInfo("hello.com")).resolves.toEqual({
        country_code: "JP",
        domain: "hello.com"
      });
    });

    test("success - r.hello.com resolves with domain", async () => {
      setAxiosGetResolvedValue3("US");
      const client = new LocationClient(_mock_logger, _mock_configuration);
      await expect(client.getGeoInfo("r.hello.com")).resolves.toEqual({
        country_code: "US",
        domain: "r.hello.com"
      });
    });

    test("success - hello.com/test/net resolves with domain", async () => {
      setAxiosGetResolvedValue1("US");
      const client = new LocationClient(_mock_logger, _mock_configuration);
      await expect(client.getGeoInfo("hello.com/test/net")).resolves.toEqual({
        country_code: "US",
        domain: "hello.com/test/net"
      });
    });

    test("fail", async () => {
      setAxiosGetResolvedValueNotFound();
      const client = new LocationClient(_mock_logger, _mock_configuration);
      await expect(client.getGeoInfo("hello.com")).resolves.toEqual({
        country_code: "",
        domain: "hello.com"
      });
    });
  });
});
