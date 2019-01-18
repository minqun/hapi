import { createApp } from "./main.js";
let { app, router, store } = createApp();
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}
router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((m, i) => {
      return diffed || (diffed = prevMatched[i] !== m);
    });
    if (!activated.length) {
      return next();
    }
    app.dfod = true;
    console.log("matchedComponents", matched);
    // 这里如果有加载指示器 (loading indicator)，就触发
    Promise.all(
      activated.map(c => {
        if (c.asyncData) {
          return c.asyncData({ store, route: to });
        }
      })
    )
      .then(() => {
        //停止加载
        setTimeout(() => {
          app.dfod = false;
        }, 2000);
        next();
      })
      .catch(next);
  });
  app.$mount("#app");
});
