module.exports = (router, controller) => {
    router.get('/user/hello', controller.user.hello);
    router.get('/user/hello/:who', controller.user.hello);
    router.post('/user/world', controller.user.world);
};
