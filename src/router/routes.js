import Testing from "../views/Testing.vue";
const routes = [
  {
    path: "/",
    name: "Meeting",
    component: Testing
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("../views/Chat.vue")
  },
  {
    path: "/video",
    name: "Video",
    component: () => import("../views/Video.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Login.vue")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../components/Signup.vue")
  }
];

export default routes;
