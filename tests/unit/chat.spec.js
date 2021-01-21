import { shallowMount, createLocalVue } from "@vue/test-utils";
import Chat from "@/views/Chat.vue";
import Vuetify from "vuetify";
import Vue from "vue";
import VueRouter from "vue-router";
// eslint-disable-next-line no-unused-vars
import meeting from "../../src/store/meeting.module";
import ChatNavigation from "@/components/meetings/ChatNavigation";
import ChatContent from "@/components/meetings/ChatContent";
import ChatForm from "@/components/meetings/ChatForm";
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
  wrapper = shallowMount(Chat, {
    localVue,
    vuetify,
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

describe("Chat.vue", () => {
  //check if chat form, chat content, chat navigation
  it("check if form, content and navigation components are available", () => {
    const form = wrapper.findComponent(ChatForm);
    const content = wrapper.findComponent(ChatContent);
    const navigation = wrapper.findComponent(ChatNavigation);
    expect(form.exists()).toBe(true);
    expect(content.exists()).toBe(true);
    expect(navigation.exists()).toBe(true);
  });
});
