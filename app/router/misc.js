module.exports = (router, controller) => {
  const { misc } = controller;
  router.get('/misc/heatmap', misc.heatmap);
}