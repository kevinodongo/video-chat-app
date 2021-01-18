import Meeting from "../views/Meeting.vue";
const routes = [
  {
    path: "/",
    name: "Meeting",
    component: Meeting
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
  }
];

export default routes;
