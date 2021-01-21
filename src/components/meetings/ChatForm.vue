<template>
  <div class="chat-form">
    <v-text-field
      name="name"
      label="Write a message"
      id="id"
      v-model="item"
      background-color="white"
      solo
      flat
      hide-details=""
    >
      <template v-slot:append>
        <div>
          <v-btn dark color="teal darken-1" @click="createmessage">
            <span style="text-transform: capitalize">send</span>
          </v-btn>
        </div>
      </template>
    </v-text-field>
  </div>
</template>

<script>
import { sendnewmessage } from "../script";
export default {
  data() {
    return {
      item: ""
    };
  },
  methods: {
    // create message
    createmessage() {
      let event = JSON.stringify({
        action: "send",
        data: `${this.item}`
      });
      sendnewmessage(event);
    }
  }
};
</script>
