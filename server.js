const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

router
    .get('/',  (ctx, next) => {
        ctx.body = 'Hello world!!!';
    })
    .post('/users', async (ctx, next) => {
        const name = ctx.request.body.name;

        const user = {
            id: 1,
            name: name
        };

        ctx.body =  user;
    });

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000);

process.on('SIGINT', () => {
    console.log('Received SIGINT!!!');
    process.exit();
});