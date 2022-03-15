import Koa from 'koa'
import Router from 'koa-router';

const app = new Koa()
const router = new Router();

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
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

router.get('/user',async (ctx) => {
    const r = Math.floor(Math.random() * 999)
    console.log(r)
    ctx.type = 'application/json';
    ctx.body = {
        code: 0,
        data: {
            id: r,
            username: 'Bob',
            age: 18
        }
    };
})
  
// response
app.use(router.routes())
app.use(router.allowedMethods({ 
    // throw: true, // 抛出错误，代替设置响应头状态
    // notImplemented: () => '不支持当前请求所需要的功能',
    // methodNotAllowed: () => '不支持的请求方式'
}));


app.on('error', err => {
    console.error('server error', err)
});

app.listen(3000)