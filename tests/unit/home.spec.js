import Vue from "vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
// eslint-disable-next-line no-unused-vars
import chat from "../../src/store/chat.module";
import Vuex from "vuex";
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

  actions = {
    //
  };

  store = new Vuex.Store({
    modules: {
      chat: {
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
  // find the preview button
  it("on mount find the preview button", async () => {
    const button = wrapper.find(".preview-button");
    expect(button.exists()).toBe(true);
  });

  // find the preview button and handle submit
  it("on button preview functions called", async () => {
    await wrapper.find(".preview-button").trigger("click");
    expect(actions.saveselected).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith("/dashboard/view");

  });
});
