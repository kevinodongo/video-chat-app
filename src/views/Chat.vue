<template>
  <div class="chat">
    <v-navigation-drawer color="#FAFAFA" v-model="drawer" app width="400">
      <ChatNavigation />
    </v-navigation-drawer>

    <div class="content">
      <v-app-bar flat color="white">
        <v-badge
          bordered
          bottom
          color="deep-purple accent-4"
          dot
          offset-x="10"
          offset-y="10"
        >
          <v-avatar size="40">
            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
          </v-avatar>
        </v-badge>
        <div class="ml-5">
          <div>Ali Connors</div>
          <div class="caption grey--text">Online</div>
        </div>
        <v-spacer></v-spacer>
        <v-icon class="mr-2">mdi-magnify</v-icon>
        <v-icon class="mr-2" @click="createvideo">mdi-video</v-icon>
        <v-icon class="mr-2">mdi-phone-outline</v-icon>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
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
      </v-app-bar>
      <v-divider></v-divider>
      <ChatContent />
    </div>

    <v-footer padless absolute>
      <v-col class="text-center" cols="12">
        <ChatForm />
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import ChatNavigation from "../components/ChatNavigation";
import ChatContent from "../components/ChatContent";
import ChatForm from "../components/ChatForm";
export default {
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
      ]
    };
  },
  methods: {
    // get color
    getColor(item) {
      if (item === "Block" || item === "mdi-block-helper") return "red";
      else return "grey";
    },
    // create video
    createvideo() {
      //
    }
  }
};
</script>
