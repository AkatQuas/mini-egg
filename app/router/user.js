module.exports = (router, controller) => {
    const { user } = controller;
    router.get('/user/hello', user.hello);
    router.get('/user/hello/:who', user.hello);
    router.post('/user/world', user.world);
    router.post('/user/mongo', user.mongoCreate);
    router.get('/user/mongo/case', user.mongoCase);
    router.get('/user/mongo/:uid', user.mongoOne);
    router.post('/user/hobbies', user.addHobbies);
};
