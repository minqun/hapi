import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import { createStore } from "./store";

Vue.config.productionTip = false;

const createApp = context => {
  const router = createRouter();
  const store = createStore();
  const app = new Vue({
    data() {
      return {
        url: context ? context.url : "",
        dfod: false
      };
    },
    router,
    store,
    render: h => h(App)
  });
  return { app, router, store };
};
/**      开发环境      */
if (process.env.VUE_APP_SET == "development") {
  let { app, router, store } = createApp();
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
          next();
        })
        .catch(next);
    });
    app.$mount("#app");
  });
}
export { createApp };
