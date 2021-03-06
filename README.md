# Mini Egg

A mini node server boilerplate on top of Koa, aiming to shed light on how [Egg](https://github.com/eggjs/egg/) works.

Slightly different on how are the `ctx`, `app` referenced.

You should take it more like a shadow project for egg, rather than a framework, though, this project is suitable for small backend node project.

## Features

- Static sever supported, the path can be configured in the `config/config.js`, which is relative to the directory `/app`.

- Session supported.

- Using [bunyan](https://github.com/trentm/node-bunyan) as logger, however the logger config is *hardcoded*.

- Websocket, using [ws](https://github.com/websockets/ws). You have to set these varibles (`token` for example) in the first connection in the url.

    ```js
    // client
    const wsc = new WebSocket('ws://localhost:8081/path-for-specific-websocket-server-instance?token=lmKam8IMg52dHbyCTk0A&uuid=hoO0TNpcIac0q7iXM139oQ')

    // server
    wss.on('connection' , (ws, req) => {
        ws.on('message', async (message) => {
            console.log('In thunder receive message: %s', message);
            console.log('[Thunder] got headers: %o ',req.headers);
            const { query } = url.parse(req.url, true);
            console.log('[Thunder] got token "%s", got uuid "%s" ', query.token, query.uuid);


            ws.send('We[thunder] have you '.concat(message));
            ws.close();
        });
        ws.on('close', async () => {
            console.log('thunder close');
        });
    })
    ```


## How to use

- Write router in `/app/router/`, [example](./app/router/user.js).

- Write the corresponding controller in `/app/controller`, [example](./app/controller/user.js).

- If you need corresponding service, just create one in `/app/service`, [example](./app/service/user.js).

- And in case you need some connection to database or redis, I recommend you to write those *DAO*es in `/app/dao`, and not register them to the `app` or `ctx` to keep the flexibility.

    Here, this boilerplate does **NOT** support plugin extensions, so nevermind.

    _In my opinion, the plugin extensions is used to extend the `app.context`, granting more functionality, so that we can access to them easily just by refering a property in `context` in the **controllers**. So if you need more plugin, just following this concept._

- Here is the [configuration files](./config) for you. As for different production environment, we got [config.local.js](./config/config.local.js) (optional) and [config.prod.js](./config/config.prod.js) (optional) which will overwrite those config in [config.js](./config/config.js).

## Customization

Feel free to fork or clone the project to customize.

## Under the hood

The files in [`/app/loader`](./app/loader) help you to register those functions or classes in the `app` fields, such as `controller`, `service`, `logger` etc.

> In some degree, these `loader` functions play the role of the `plugin` or `extensions`.

## What's not inclueded?

- Server side rendering Engine.

- Process deamon such as `pm2`.

- <del>Agent/Worker mode for robust.</del> Check [app/index.js](./app/index.js) for details.

- Plugin extensions.

- Testing Case.

- Error Monitor.

- Event trace.
