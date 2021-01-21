import { shallowMount, createLocalVue } from "@vue/test-utils";
import Video from "@/views/Video.vue";
import Vuetify from "vuetify";
import Vue from "vue";
import VueRouter from "vue-router";
// eslint-disable-next-line no-unused-vars
import meeting from "../../src/store/meeting.module";
import Vuex from "vuex";
// initilaize vuetify
Vue.use(Vuetify);
// initilaize routes
if (!process || process.env.NODE_ENV !== "test") {
  Vue.use(VueRouter);
}

let wrapper;
let state;
let actions;
let store;
let localVue;
let router;
let vuetify;

beforeEach(() => {
  vuetify = new Vuetify();
  localVue = createLocalVue();
  router = new VueRouter();
  Vue.use(Vuex);

  router = {
    push: jest.fn()
  };

  state = {};


  actions = {};

  store = new Vuex.Store({
    modules: {
      meeting: {
        state,
        actions,
        namespaced: true
      }
    }
  });
  wrapper = shallowMount(Video, {
    vuetify,
    localVue,
    stubs: ["router-link", "router-view"],
    store,
    mocks: {
      $router: router
    }
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("Video.vue", () => {
  // find the grid button
  it("on mount find the join button", async () => {
    const button = wrapper.find(".grid_button");
    expect(button.exists()).toBe(false);
  });
});
