"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const app = new koa_1.default();
const router = new koa_router_1.default();
// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});
// logger
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    // console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});
router.get('/user', async (ctx) => {
    const r = Math.floor(Math.random() * 999);
    ctx.type = 'application/json';
    ctx.body = {
        code: 0,
        data: {
            id: r,
            username: 'Bob',
            age: 18
        }
    };
});
// response
app.use(router.routes());
app.use(router.allowedMethods({
// throw: true, // 抛出错误，代替设置响应头状态
// notImplemented: () => '不支持当前请求所需要的功能',
// methodNotAllowed: () => '不支持的请求方式'
}));
app.on('error', err => {
    console.error('server error', err);
});
exports.default = app;
