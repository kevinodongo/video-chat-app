<template>
  <div class="chat-section">
    <v-sheet style="height: 600px; overflow-y: auto; overflow-x: hidden">
      <v-container fluid>
        <v-row
          :justify="getAlignment(item.name)"
          v-for="(item, index) in items"
          :key="index"
        >
          <v-col cols="12" md="6">
            <div class="chat_section" :style="getStyle(item.name)">
              {{ item.message }}
            </div>
            <div class="ml-1 mt-1">
              <span
                style="-webkit-font-smoothing: antialiased; color: #37474F; -moz-osx-font-smoothing: grayscale; font-size: 15px;"
                >{{ item.name }}</span
              >
              <v-icon class="ml-1 mr-1">mdi-minus</v-icon>
              <span class="caption grey--text">
                {{ item.createdAt }}
              </span>
              <v-menu offset-y left>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">mdi-dots-horizontal</v-icon>
                </template>
                <v-list width="170" dense>
                  <v-list-item v-for="(item, index) in objects" :key="index">
                    <v-icon class="mr-2" small>{{ item.icon }}</v-icon>
                    <v-list-item-title class="grey--text">{{
                      item.title
                    }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "ChatContent",
  data() {
    return {
      objects: [
        {
          icon: "mdi-image-filter-none",
          title: "Copy"
        },
        {
          icon: "mdi-undo",
          title: "Forward"
        },
        {
          icon: "mdi-star-outline",
          title: "Favourite"
        },
        {
          icon: "mdi-delete-outline",
          title: "Delete"
        },
      ],
      logged: "",
      items: [],
      sender: {
        "background-color": "teal",
        color: "white",
        padding: "1rem",
        "border-radius": "10px"
      },
      receiver: {
        "background-color": "#ECEFF1",
        padding: "1rem",
        "border-radius": "10px"
      }
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    getStyle(item) {
      if (item === this.logged) return this.sender;
      else return this.receiver;
    },
    getAlignment(item) {
      if (item === this.logged) return "end";
      else return "start";
    }
  }
};
</script>

<style scooped lang="css">
.chat_section {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 15px;
}
</style>
