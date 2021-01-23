<template>
  <div class="option-section">
    <v-overlay opacity="1" :value="overlay">
      <div class="title font-weight-light">Processing one moment....</div>
    </v-overlay>
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="11" sm="7" md="6" lg="4">
        <v-sheet style="border: 1px solid grey; border-radius: 10px">
          <v-card-text class="pa-10 mx-auto">
            <div class="option_section_title text-center">
              Welcome!
            </div>
            <div class="option_section_text text-center">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </div>
            <div class="text-center mt-3" v-if="loading">
              <v-progress-circular
                indeterminate
                color="teal"
                width="2"
              ></v-progress-circular>
            </div>
            <!--Link-->
            <v-row justify="center">
              <v-col cols="12">
                <v-sheet class="mt-5" color="#E0F2F1">
                  <v-card-text class="text-center">
                    <div class="link_text">
                      {{ meeting_id }}
                    </div>
                  </v-card-text>
                </v-sheet>
              </v-col>
            </v-row>

            <!--/end-->
            <v-row justify="center" class="mt-7" dense>
              <v-col cols="12" md="5">
                <v-btn
                  color="teal darken-1"
                  dark
                  block
                  large
                  @click="gotochat"
                  outlined
                  elevation="3"
                  class="option_section_button message_button"
                >
                  <v-icon class="mr-2">mdi-message-text</v-icon>
                  <span class="option_button_text">Message</span>
                </v-btn>
              </v-col>
              <v-col cols="12" md="5">
                <v-btn
                  color="teal darken-1"
                  dark
                  block
                  @click="gotovideo"
                  large
                  outlined
                  elevation="3"
                  class="option_section_button video_button"
                >
                  <v-icon class="mr-2">mdi-video</v-icon>
                  <span class="option_button_text">Video</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  createnewmeeting,
  createsignal,
  generateurl
} from "../components/script";
var randomize = require("randomatic");
export default {
  name: "Option",
  data() {
    return {
      overlay: true,
      loading: false
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
    setTimeout(() => {
      this.overlay = false;
    }, 1000);
  },
  // methods
  methods: {
    // go to chat
    async gotochat() {
      this.loading = true;
      let response = await generateurl("chat");
      let event = JSON.stringify({
        action: "create",
        data: `${response}` // meeting id
      });
      createnewmeeting(event);
      // set timeout
      setTimeout(() => {
        this.loading = false;
        this.$router.push("/chat");
      }, 1000);
    },
    // go to video
    async gotovideo() {
      this.loading = true;
      // 1. store user as master
      let user = "MASTER";
      this.$store.dispatch("savecurrentuser", user);
      // 2a. Get the channel name
      let channel_name = randomize("Aa0", 10);
      await createsignal(channel_name);
      // 2b. Save channel name
      this.$store.dispatch("saveurl", channel_name);
      // set timeout
      setTimeout(() => {
        this.loading = false;
        this.$router.push("/video");
      }, 1000);
      // end
    }
    // end
  }
};
</script>

<style scooped lang="css">
.option-section {
  height: 100vh;
}
.link_text {
  color: #37474f;
  font-size: 1.5em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.option_button_text {
  text-transform: capitalize;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@media only screen and (max-width: 960px) {
  .home_bar {
    margin-bottom: 5rem;
  }
}
.option_section_title {
  font-size: 1.5em;
  font-weight: 410;
  color: black;
  margin-bottom: 0.5rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.option_section_text {
  color: #37474f;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
