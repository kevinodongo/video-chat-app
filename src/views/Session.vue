<template>
  <div class="session">
    <v-navigation-drawer v-model="drawer" app>
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <v-icon class="grid_button" color="black" @click="showgrid">mdi-view-grid</v-icon>
      </v-toolbar>
      <v-card-text>
        <div v-for="item in items" :key="item.id">
          <v-card height="100" class="mt-1">
            <div>{{ item.connectionId }}</div>
          </v-card>
        </div>
      </v-card-text>
    </v-navigation-drawer>
    <v-card class="session-section" width="250" v-if="expand">
      <v-list rounded dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in selects" :key="i">
            <v-list-item-icon>
              <v-icon size="20" v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-text="item.text"
                style="color: #37474F"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <div class="container">
      <v-row>
        <v-col v-for="(item, index) in elements" :key="index">
          <v-card min-width="500px" tile>
            <div>{{ item.connectionId }}</div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-footer absolute class="pa-5" color="#ECEFF1">
      <v-icon @click="drawer = !drawer" color="black">mdi-view-grid</v-icon>
      <v-spacer></v-spacer>
      <v-icon color="black" @click="expand = !expand">mdi-dots-vertical</v-icon>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "Session",
  data() {
    return {
      drawer: true,
      selects: [
        { text: "Whiteboard", icon: "mdi-bulletin-board" },
        { text: "Change Layout", icon: "mdi-grid" },
        { text: "Full Screen", icon: "mdi-fullscreen" },
        { text: "Turn on caption", icon: "mdi-closed-caption" },
        { text: "Report abuse", icon: "mdi-information-outline" },
        { text: "Troubleshoot", icon: "mdi-flag" },
        { text: "Settings", icon: "mdi-cog" }
      ],
      expand: false,
      item: {},
      elements: [],
      items: [],
      grid: false
    };
  },
  // mounted
  mounted() {
    this.elements.push(this.item);
  },
  // methods
  methods: {
    // show grid
    showgrid() {
      let array = [];
      if (this.grid === false) {
        this.grid = true;
        this.elements = [...this.elements, ...this.items];
      } else {
        array.push(this.item);
        this.elements = [...array];
        this.grid = false;
      }
    }
  }
  // end
};
</script>

<style scooped lang="css">
.session-section {
  position: fixed;
  bottom: 4.5rem;
  right: 10px;
  z-index: 99;
}
</style>
