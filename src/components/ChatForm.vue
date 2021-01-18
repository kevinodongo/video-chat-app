<template>
  <div class="chat-form">
    <v-text-field
      name="name"
      label="Write a message"
      id="id"
      v-model="item"
      background-color="white"
      hide-details=""
      outlined
      single-line
    >
      <template v-slot:append>
        <div>
          <v-icon @click="createmessage" large color="purple">mdi-send</v-icon>
        </div>
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: ""
    };
  },
  methods: {
    // create message
    createmessage() {
      //
    }
  }
};
</script>
