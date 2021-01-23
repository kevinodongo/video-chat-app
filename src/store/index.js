import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// store
const store = new Vuex.Store({
  state: {
    messages: [],
    users: [],
    meeting_url: null, // meeting url
    currentuser: null // MASTER || VIEWER
  },
  actions: {
    // action current user
    savecurrentuser({ commit }, value) {
      commit("savecurrentuser", value);
    },
    // action save url
    saveurl({ commit }, value) {
      commit("saveurl", value)
    }
  },
  mutations: {
    // save current user
    savecurrentuser(state, value) {
      state.currentuser = value;
    },
    // save url
    saveurl(state, value) {
      state.meeting_url = value;
    },
    // save users 
    saveusers(state, value) {
      state.users = value;
    }
  }
});

export default store;
