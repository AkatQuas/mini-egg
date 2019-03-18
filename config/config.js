module.exports = {
    app: {
        name: 'Mini-Egg',
        port: 5002
    },
    redis: {
        port: 6379,
        host: 'localhost',
        family: 4,
        password: null,
        db: 0
    },
    mongo: {
        uri: 'mongodb://localhost:27017/'
    },
    middleware: {
        // relative path, the root directory is `app`
        static: 'public',

        //https://github.com/dlau/koa-body#options
        body: {
            multipart: true,
            jsonLimit: '5mb',
            formLimit: '1mb',
            textLimit: '5mb'
        },

        session: {
            key: 'mini-egg:sess',
            maxAge: 86400000,
            autoCommit: true,
            overwrite: true,
            httpOnly: true,
            signed: true,
            rolling: false,
            renew: false
        }

    }
};
