# Mini Egg

A mini node server boilerplate on top of Koa, aiming to shed light on how [Egg](https://github.com/eggjs/egg/) works.

Slightly different on how are the `ctx`, `app` referenced.

You should take it more like a shadow project for egg, rather than a framework, though, this project is suitable for small backend node project.

## Features

- Static sever supported, the path can be configured in the `config/config.js`, which is relative to the directory `/app`.

- Session supported.

- Using [bunyan](https://github.com/trentm/node-bunyan) as logger, however the logger config is *hardcoded*.

## How to use

- Write router file in `/app/router/`, [example file](./app/router/user.js).

- Write the corresponding controller file in `/app/controller`, [example file](./app/controller/user.js).

- If you need corresponding service file, just create one in `/app/service`, [example file](./app/service/user.js).

- And in case you need some connection to database or redis, I recommend you to write those *DAO*es in `/app/dao`, and not register them to the `app` or `ctx` to keep the flexibility.

    In the [Egg] framework, I guess those plugins help you to register these *DAO*es, so you can have access to them in the `ctx` or `app` easily.

    Here, this boilerplate does **NOT** support plugin extensions, so nevermind.

- Here is the [configuration files](./config) for you. As for different production environment, we got [config.local.js](./config/config.local.js) (optional) and [config.prod.js](./config/config.prod.js) (optional) which will overwrite those config in [config.js](./config/config.js).

## Customization

Feel free to fork or clone the project to customzie.

## Under tho hood

The files in [`/app/loader`](./app/loader) help you to register those functions or classes in the `app` fields, such as `controller`, `service`, `logger` etc.

## What's not inclueded?

- Server side rendering Engine.

- Process deamon such as `pm2`.

- Agent/Worker mode for robust.

- Plugin extensions.

- Test Case.

- Error Monitor.

- Event trace.
