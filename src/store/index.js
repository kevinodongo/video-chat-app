import Vue from "vue";
import Vuex from "vuex";
import { chat } from "./chat.module";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    chat
  }
});
