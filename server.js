// const http = require('http');
//
// const hostname ="127.0.0.1";
// const port = "3000";
//
// const server = http.createServer((req, res) => {
//     res.statusCode =200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello world\n');
// });
//
// server.listen(port, hostname, () => {
//     console.log(`Server running ${hostname}:${port}`);
// });

// const express = require('express')
// const app = express()
// const port = 3000
//
// app.get('/', (req, res) => res.send('Hello World!!!!!!'))
// app.get('/text', (req, res) => res.send('TEST!!!'))
//
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

router
    .get('/',  (ctx, next) => {
        console.log(ctx);
        ctx.body = 'Hello world!';
    })
    .post('/users', async (ctx, next) => {
        console.log(ctx);
        let arr = [];

        await new Promise((resolve, reject) => {
            ctx.req.on('data', (data) => {
                arr.push(data);
            })

            ctx.req.on('end', () => {
                ctx.body = JSON.parse(arr);
                resolve();
            })
        })

    });

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);