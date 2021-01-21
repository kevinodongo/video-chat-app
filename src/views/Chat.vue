<template>
  <div class="chat">
    <v-navigation-drawer width="350" v-model="drawer" app>
      <ChatNavigation />
    </v-navigation-drawer>
    <div class="content">
      <v-toolbar flat color="#ECEFF1">
        <v-icon @click="drawer = !drawer" color="black">mdi-menu</v-icon>
        <div
          class="ml-2 teal--text"
          v-if="meeting_id"
          style="border: 2px dashed teal; padding: 5px"
        >
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on"
                ><span>{{ meeting_id }}</span
                >,<span style="text-transform: lowercase">{{
                  route
                }}</span></span
              >
            </template>
            <span>Share this with your users</span>
          </v-tooltip>
        </div>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="black" v-bind="attrs" v-on="on"
              >mdi-dots-vertical</v-icon
            >
          </template>
          <v-list width="200" dense>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-icon class="mr-3" small :color="getColor(item.icon)">{{
                item.icon
              }}</v-icon>
              <v-list-item-title :style="{ color: getColor(item.title) }">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <ChatContent />
    </div>
    <v-footer padless absolute color="#ECEFF1">
      <v-col class="text-center" cols="12">
        <ChatForm />
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import ChatNavigation from "../components/meetings/ChatNavigation";
import ChatContent from "../components/meetings/ChatContent";
import ChatForm from "../components/meetings/ChatForm";
export default {
  name: "Chat",
  components: { ChatNavigation, ChatContent, ChatForm },
  data() {
    return {
      drawer: true,
      items: [
        {
          icon: "mdi-magnify",
          title: "Search"
        },
        {
          icon: "mdi-information-outline",
          title: "View info"
        },
        {
          icon: "mdi-bell-outline",
          title: "Mute Notification"
        },
        {
          icon: "mdi-image-filter-center-focus",
          title: "Wallpaper"
        },
        {
          icon: "mdi-magnify",
          title: "Archive"
        },
        {
          icon: "mdi-delete-outline",
          title: "Delete"
        },
        {
          icon: "mdi-block-helper",
          title: "Block"
        }
      ],
      route: ""
    };
  },
  // computed
  computed: {
    meeting_id() {
      return this.$store.state.meeting_url;
    }
  },
  // mounted
  mounted() {
    this.route = this.$route.name;
  },
  methods: {
    // get color
    getColor(item) {
      if (item === "Block" || item === "mdi-block-helper") return "red";
      else return "grey";
    },
    // create video
    createvideo() {
      this.$router.push("/video");
    }
  }
};
</script>
