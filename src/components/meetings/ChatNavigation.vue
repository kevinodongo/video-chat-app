<template>
  <div class="navigation">
    <v-list dense>
      <v-list-item-group>
        <template v-for="(item, index) in items">
          <v-list-item :key="item.id">
            <v-list-item-content>
              <v-list-item-title v-html="item.name"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text>min ago</v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
          <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "Chatnavigation",
  data() {
    return {
      value: ""
      //items: []
    };
  },
  // computed
  computed: {
    items() {
      return this.$store.state.users;
    }
  },
  // methods
  methods: {
    formatDate(item) {
      const response = item.split(":");
      let hour = response[1];
      let min = response[2];
      return "at" + " " + `${hour}` + ":" + `${min}`;
    }
  }
};
</script>
