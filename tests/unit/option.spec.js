import { shallowMount, createLocalVue } from "@vue/test-utils";
import Option from "@/views/Option.vue";
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
  wrapper = shallowMount(Option, {
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

describe("Option.vue", () => {
  // find the link text
  it("on mount find the link text", async () => {
    const button = wrapper.find(".link_text");
    expect(button.exists()).toBe(true);
  });

  // find the message button and test
  it("on mount find the message button and click", async () => {
    await wrapper.find(".message_button").trigger("click");
    wrapper.vm.gotochat(); // call method
    expect(router.push).toHaveBeenCalledWith("/chat");
  });

  // find the video button and test
  it("on mount find the video button and click", async () => {
    await wrapper.find(".video_button").trigger("click");
    wrapper.vm.gotovideo(); // call method
    expect(router.push).toHaveBeenCalledWith("/video");
  });
});
