import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import { createStore } from "./store";
import mixins from "./mixins.js";
Vue.mixin(mixins);
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
export { createApp };
