import Vue from "vue";
import Vuex from "vuex";
import { meeting } from "./meeting.module";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    meeting,
  },
});
