import Home from "../views/Home.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  // authentication routes
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/auth/Login.vue")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../components/auth/Signup.vue")
  },
  {
    path: "/login-help",
    name: "LoginHelp",
    component: () => import("../components/auth/Loginhelp.vue")
  },
  {
    path: "/confirm",
    name: "Confirm",
    component: () => import("../components/auth/Confirm.vue")
  },
  // end
  {
    path: "/option-select",
    name: "Option",
    component: () => import("../views/Option.vue")
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
    path: "/session",
    name: "Session",
    component: () => import("../views/Session.vue")
  },
  //meta: { requiresAuth: true },
  // otherwise
  { path: "*", redirect: "/" }
];

export default routes;
