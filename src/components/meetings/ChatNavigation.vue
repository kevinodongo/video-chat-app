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
              <v-list-item-action-text>{{
                formatDate(item.createdAt)
              }}</v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
          <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      value: "",
      items: []
    };
  },
  // methods
  methods: {
    formatDate(item) {
      return moment(item).fromNow();
    },
  }
};
</script>
