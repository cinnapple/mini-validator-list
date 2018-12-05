"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("jest");
// jest mock
const _mock_configuration = {
    getIPStackFetchURL: jest.fn().mockReturnValue("lookupServiceProvider.com"),
    getIPStackApiKey: jest.fn().mockReturnValue("API_KEY")
};
const _mock_logger = {
    info: jest.fn()
};
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
const axios_1 = require("axios");
const locationClient_1 = require("../src/locationClient");
describe("LocationClient", () => {
    beforeEach(() => { });
    describe("getGeoInfo", () => {
        const setAxiosGetResolvedValue1 = value => {
            axios_1.default.get.mockResolvedValue({
                data: {
                    country_code: value
                }
            });
        };
        const setAxiosGetResolvedValue2 = value => {
            axios_1.default.get.mockResolvedValueOnce({
                data: {
                    country_code: ""
                }
            });
            axios_1.default.get.mockResolvedValueOnce({
                data: {
                    country_code: value
                }
            });
        };
        const setAxiosGetResolvedValue3 = value => {
            axios_1.default.get.mockResolvedValueOnce({
                data: {
                    country_code: ""
                }
            });
            axios_1.default.get.mockResolvedValueOnce({
                data: {
                    country_code: ""
                }
            });
            axios_1.default.get.mockResolvedValueOnce({
                data: {
                    country_code: value
                }
            });
        };
        const setAxiosGetResolvedValueNotFound = () => {
            axios_1.default.get.mockResolvedValueOnce({
                data: {
                    country_code: ""
                }
            });
            axios_1.default.get.mockResolvedValueOnce({
                data: {
                    country_code: ""
                }
            });
        };
        test("success - hello.com resolves with domain", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            _mock_bluebird_promisify.mockReset();
            _mock_bluebird_promisify.mockReturnValue(_mock_dns_lookup_async);
            setAxiosGetResolvedValue1("JP");
            const client = new locationClient_1.default(_mock_logger, _mock_configuration);
            yield expect(client.getGeoInfo("r.hello.com")).resolves.toEqual({
                country_code: "JP",
                domain: "r.hello.com"
            });
        }));
        test("success - hello.com resolves with ip", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            _mock_bluebird_promisify.mockReset();
            _mock_bluebird_promisify.mockReturnValue(_mock_dns_lookup_async);
            setAxiosGetResolvedValue2("JP");
            const client = new locationClient_1.default(_mock_logger, _mock_configuration);
            yield expect(client.getGeoInfo("hello.com")).resolves.toEqual({
                country_code: "JP",
                domain: "hello.com"
            });
        }));
        test("success - r.hello.com resolves with domain", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            setAxiosGetResolvedValue3("US");
            const client = new locationClient_1.default(_mock_logger, _mock_configuration);
            yield expect(client.getGeoInfo("r.hello.com")).resolves.toEqual({
                country_code: "US",
                domain: "r.hello.com"
            });
        }));
        test("success - hello.com/test/net resolves with domain", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            setAxiosGetResolvedValue1("US");
            const client = new locationClient_1.default(_mock_logger, _mock_configuration);
            yield expect(client.getGeoInfo("hello.com/test/net")).resolves.toEqual({
                country_code: "US",
                domain: "hello.com/test/net"
            });
        }));
        test("fail", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            setAxiosGetResolvedValueNotFound();
            const client = new locationClient_1.default(_mock_logger, _mock_configuration);
            yield expect(client.getGeoInfo("hello.com")).resolves.toEqual({
                country_code: "",
                domain: "hello.com"
            });
        }));
    });
});
//# sourceMappingURL=locationClient.spec.js.map