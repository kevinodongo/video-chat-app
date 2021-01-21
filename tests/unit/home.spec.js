import { shallowMount, createLocalVue } from "@vue/test-utils";
import Home from "@/views/Home.vue";
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

beforeEach(() => {
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
  wrapper = shallowMount(Home, {
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

describe("Home.vue", () => {
  // find the home button
  it("on mount find the home button", async () => {
    const button = wrapper.find(".home_button");
    expect(button.exists()).toBe(true);
  });

  // find the home button
  it("on mount find the home button and click", async () => {
    await wrapper.find(".home_button").trigger("click");
    wrapper.vm.createmeeting(); // call method
    expect(router.push).toHaveBeenCalledWith("/option-select");
  });
});
