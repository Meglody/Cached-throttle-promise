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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var __1 = __importDefault(require(".."));
var index_1 = __importDefault(require("../server/index"));
var axios_1 = __importDefault(require("axios"));
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
                var resp, resp1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, useUser.act()];
                        case 1:
                            resp = _a.sent();
                            return [4 /*yield*/, useUser.act()];
                        case 2:
                            resp1 = _a.sent();
                            (0, chai_1.expect)(resp).to.equal(resp1);
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
        it('only returns one cached value in a time', function (done) {
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
            foo();
            bar().then(function () {
                (0, chai_1.expect)(value_0).to.equal(value_1);
                done();
            });
        });
        it('returns two different values in different times', function (done) {
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
                        case 0: return [4 /*yield*/, useUser.act()];
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
            bar().then(function () {
                (0, chai_1.expect)(value_0).to.equal(value_1);
                (0, chai_1.expect)(value_1).to.not.equal(value_2);
                done();
            });
        });
        it('only returns one cached value, in macro-tasks', function (done) {
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
            foo();
            setTimeout(function () {
                bar().then(function () {
                    (0, chai_1.expect)(value_0).to.equal(value_1);
                    done();
                });
            });
        });
        return [2 /*return*/];
    });
}); });
describe('===> Suit(No.3): Case refresh once', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('only returns one cached value', function (done) {
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
                            return [2 /*return*/];
                    }
                });
            }); };
            var baz = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, useUser.act()];
                        case 1:
                            value_2 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            foo();
            bar();
            baz().then(function () {
                (0, chai_1.expect)(value_0).to.equal(value_1);
                (0, chai_1.expect)(value_1).to.equal(value_2);
                done();
            });
        });
        it('only return one cached value, in macro-tasks', function (done) {
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
                            return [2 /*return*/];
                    }
                });
            }); };
            foo();
            bar();
            setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, useUser.act()];
                        case 1:
                            value_2 = _a.sent();
                            (0, chai_1.expect)(value_0).to.equal(value_1);
                            (0, chai_1.expect)(value_1).to.equal(value_2);
                            done();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        it('returns two different values, in micro-tasks', function (done) {
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
            bar().then(function () {
                (0, chai_1.expect)(value_0).to.equal(value_1);
                (0, chai_1.expect)(value_1).to.not.equal(value_2);
                done();
            });
        });
        return [2 /*return*/];
    });
}); });
describe('===> Suit(No.4): Case multiple refresh', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('Useing refresh in async env', function (done) {
            var fetcher = function () { return servise.get('http://localhost:3000/user'); };
            var useUser = new __1.default(fetcher);
            var value_0, value_1, value_2, value_3, value_4, value_5, value_6, value_7;
            var foo = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, useUser.act()];
                        case 1:
                            value_0 = _a.sent();
                            return [4 /*yield*/, useUser.refresh()];
                        case 2:
                            value_1 = _a.sent();
                            return [4 /*yield*/, useUser.act()];
                        case 3:
                            value_2 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            var bar = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, useUser.act()];
                        case 1:
                            value_3 = _a.sent();
                            return [4 /*yield*/, useUser.refresh()];
                        case 2:
                            value_4 = _a.sent();
                            return [4 /*yield*/, useUser.act()];
                        case 3:
                            value_5 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            var baz = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, useUser.refresh()];
                        case 1:
                            value_6 = _a.sent();
                            return [4 /*yield*/, useUser.act()];
                        case 2:
                            value_7 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            var foz = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, foo()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, bar()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, baz()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            foz().then(function () {
                (0, chai_1.expect)(value_0).to.not.equal(value_1);
                (0, chai_1.expect)(value_1).to.equal(value_2);
                (0, chai_1.expect)(value_3).to.equal(value_2);
                (0, chai_1.expect)(value_4).to.not.equal(value_3);
                (0, chai_1.expect)(value_4).to.equal(value_5);
                (0, chai_1.expect)(value_6).to.not.equal(value_5);
                (0, chai_1.expect)(value_7).to.equal(value_6);
                done();
            });
        });
        it('Useing refresh in sync env', function (done) {
            var fetcher = function () { return servise.get('http://localhost:3000/user'); };
            var useUser = new __1.default(fetcher);
            var value_0, value_1, value_2, value_3, value_4, value_5, value_6, value_7;
            var foo = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, useUser.act()];
                        case 1:
                            value_0 = _a.sent();
                            return [4 /*yield*/, useUser.refresh()];
                        case 2:
                            value_1 = _a.sent();
                            return [4 /*yield*/, useUser.act()];
                        case 3:
                            value_2 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            var bar = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, useUser.act()];
                        case 1:
                            value_3 = _a.sent();
                            return [4 /*yield*/, useUser.refresh()];
                        case 2:
                            value_4 = _a.sent();
                            return [4 /*yield*/, useUser.act()];
                        case 3:
                            value_5 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            var baz = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, useUser.refresh()];
                        case 1:
                            value_6 = _a.sent();
                            return [4 /*yield*/, useUser.act()];
                        case 2:
                            value_7 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            foo();
            bar();
            baz().then(function () {
                (0, chai_1.expect)(value_0).to.equal(value_3);
                (0, chai_1.expect)(value_3).to.equal(value_6);
                (0, chai_1.expect)(value_1).to.equal(value_4);
                (0, chai_1.expect)(value_4).to.equal(value_7);
                (0, chai_1.expect)(value_2).to.equal(value_5);
                done();
                server.close();
            });
        });
        return [2 /*return*/];
    });
}); });
