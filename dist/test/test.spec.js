"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const __1 = __importDefault(require(".."));
const index_1 = __importDefault(require("../server/index"));
const axios_1 = __importDefault(require("axios"));
const servise = axios_1.default.create();
servise.interceptors.response.use(resp => {
    return resp.data;
});
const server = index_1.default.listen(3000);
describe('===> Suit(No.1): Case multiple using instance.act() in async env', async () => {
    it('only returns one cached value', (done) => {
        const fetcher = () => servise.get('http://localhost:3000/user');
        const useUser = new __1.default(fetcher);
        const foo = async () => {
            const resp = await useUser.act();
            const resp1 = await useUser.act();
            const res = resp === resp1;
            (0, chai_1.expect)(res).to.be.equal(true);
        };
        foo().then(() => {
            done();
        });
    });
});
describe('===> Suit(No.2): Case multiple using instance.act() in sync env', async () => {
    it('only returns one cached value', (done) => {
        const fetcher = () => servise.get('http://localhost:3000/user');
        const useUser = new __1.default(fetcher);
        let value_0, value_1;
        const foo = async () => {
            value_0 = await useUser.act();
        };
        const bar = async () => {
            value_1 = await useUser.act();
        };
        const baz = async () => {
            foo();
            bar();
        };
        baz().then(() => {
            (0, chai_1.expect)(value_0 === value_1).to.be.equal(true);
            done();
        });
    });
});
describe('===> Suit(No.3): Case refresh', async () => {
    it('two values not equal', (done) => {
        const fetcher = () => servise.get('http://localhost:3000/user');
        const useUser = new __1.default(fetcher);
        let value_0, value_1, value_2;
        const foo = async () => {
            value_0 = await useUser.act();
        };
        const bar = async () => {
            value_1 = await useUser.refresh();
            value_2 = await useUser.act();
        };
        foo();
        setTimeout(async () => {
            (0, chai_1.expect)(value_0 !== value_1).to.be.equal(true);
            (0, chai_1.expect)(value_1 === value_2).to.be.equal(true);
            bar().then(() => {
                done();
            });
        }, 10);
    });
});
describe('===> Suit(No.4): Case multiple using instance.refresh() in async env', async () => {
    it('only returns one cached value', (done) => {
        const fetcher = () => servise.get('http://localhost:3000/user');
        const useUser = new __1.default(fetcher);
        let value_0, value_1, value_2, value_3;
        const foo = async () => {
            value_0 = await useUser.act();
        };
        const bar = async () => {
            value_1 = await useUser.refresh();
            value_2 = await useUser.refresh();
            value_3 = await useUser.act();
        };
        foo();
        setTimeout(async () => {
            bar().then(() => {
                (0, chai_1.expect)(value_0 !== value_1).to.be.equal(true);
                (0, chai_1.expect)(value_1 === value_2).to.be.equal(true);
                (0, chai_1.expect)(value_2 === value_3).to.be.equal(true);
                done();
                server.close();
            });
        }, 10);
    });
});
