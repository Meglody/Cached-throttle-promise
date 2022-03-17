"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var __1 = require("..");
var index_1 = require("../server/index");
var axios_1 = require("axios");
var servise = axios_1.default.create();
servise.interceptors.response.use(function (resp) {
    return resp.data;
});
var server = index_1.default.listen(3000);
describe('===> Suit(No.1): Case multiple using instance.act() in async env', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('only returns one cached value', function (done) {
            var fetcher = function () { return servise.get('http://localhost:3000/user'); };
            var useUser = new __1.default(fetcher);
            var foo = function () { return __awaiter(void 0, void 0, void 0, function () {
                var resp, resp1, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, useUser.act()];
                        case 1:
                            resp = _a.sent();
                            return [4 /*yield*/, useUser.act()];
                        case 2:
                            resp1 = _a.sent();
                            res = resp === resp1;
                            (0, chai_1.expect)(res).to.be.equal(true);
                            return [2 /*return*/];
                    }
                });
            }); };
            foo().then(function () {
                done();
            });
        });
        return [2 /*return*/];
    });
}); });
describe('===> Suit(No.2): Case multiple using instance.act() in sync env', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('only returns one cached value', function (done) {
            var fetcher = function () { return servise.get('http://localhost:3000/user'); };
            var useUser = new __1.default(fetcher);
            var value_0, value_1;
            var foo = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, useUser.act()];
                        case 1:
                            value_0 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            var bar = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, useUser.act()];
                        case 1:
                            value_1 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            var baz = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    foo();
                    bar();
                    return [2 /*return*/];
                });
            }); };
            baz().then(function () {
                (0, chai_1.expect)(value_0 === value_1).to.be.equal(true);
                done();
            });
        });
        return [2 /*return*/];
    });
}); });
describe('===> Suit(No.3): Case refresh', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('two values not equal', function (done) {
            var fetcher = function () { return servise.get('http://localhost:3000/user'); };
            var useUser = new __1.default(fetcher);
            var value_0, value_1, value_2;
            var foo = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, useUser.act()];
                        case 1:
                            value_0 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            var bar = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, useUser.refresh()];
                        case 1:
                            value_1 = _a.sent();
                            return [4 /*yield*/, useUser.act()];
                        case 2:
                            value_2 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            foo();
            setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    (0, chai_1.expect)(value_0 !== value_1).to.be.equal(true);
                    (0, chai_1.expect)(value_1 === value_2).to.be.equal(true);
                    bar().then(function () {
                        done();
                    });
                    return [2 /*return*/];
                });
            }); }, 10);
        });
        return [2 /*return*/];
    });
}); });
describe('===> Suit(No.4): Case multiple using instance.refresh() in async env', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('only returns one cached value', function (done) {
            var fetcher = function () { return servise.get('http://localhost:3000/user'); };
            var useUser = new __1.default(fetcher);
            var value_0, value_1, value_2, value_3;
            var foo = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, useUser.act()];
                        case 1:
                            value_0 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            var bar = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, useUser.refresh()];
                        case 1:
                            value_1 = _a.sent();
                            return [4 /*yield*/, useUser.refresh()];
                        case 2:
                            value_2 = _a.sent();
                            return [4 /*yield*/, useUser.act()];
                        case 3:
                            value_3 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            foo();
            setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    bar().then(function () {
                        (0, chai_1.expect)(value_0 !== value_1).to.be.equal(true);
                        (0, chai_1.expect)(value_1 === value_2).to.be.equal(true);
                        (0, chai_1.expect)(value_2 === value_3).to.be.equal(true);
                        done();
                        server.close();
                    });
                    return [2 /*return*/];
                });
            }); }, 10);
        });
        return [2 /*return*/];
    });
}); });
