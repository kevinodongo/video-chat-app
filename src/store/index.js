import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    messages: [],
    users: [],
    meeting_url: null // meeting url
  },
  actions: {},
  mutations: {
    saveurl(state, value) {
      state.meeting_url = value;
    },
    saveusers(state, value) {
      state.users = value;
    }
  }
});

export default store;
