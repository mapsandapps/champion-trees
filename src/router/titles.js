export default function(router) {
  router.beforeEach((to, from, next) => {
    let title = to.meta.title ? `${to.meta.title} - ` : '';
    title += 'Atlanta\'s Champion Trees';

    document.title = title;

    next();
  });
}
