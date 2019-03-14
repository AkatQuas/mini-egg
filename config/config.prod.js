module.exports = {
    app: {
        name: 'Mini-Egg',
        port: 3002
    },
    redis: {
        port: 66379,
        host: 'localhost',
        family: 4,
        password: null,
        db: 0
    },
    middleware: {
        // relative path, the root directory is `app`
        static: 'public',

        session: {
            key: 'mini-egg:sess',
            maxAge: 7200,
            autoCommit: true,
            overwrite: true,
            httpOnly: true,
            signed: true,
            rolling: false,
            renew: false
        }

    }
};
