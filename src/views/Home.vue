<template>
  <div class="home_section">
    <!--App bar-->
    <v-app-bar flat color="white" class="home_bar">
      <img
        src="https://res.cloudinary.com/dk5ch7wqm/image/upload/v1610042479/IMG-20200910-WA0020_ppnudi.jpg"
        alt="logo"
        height="60"
      />
      <div style="font-size: 1.5em;" class="ml-4">Meetings</div>
      <v-spacer></v-spacer>
      <v-menu offset-y left transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-if="!islogged"
            class="d-flex d-sm-none"
            v-bind="attrs"
            v-on="on"
            large
            >mdi-menu</v-icon
          >
        </template>
        <v-card width="150">
          <v-list-item dense to="/login">
            <v-list-item-title>Log in</v-list-item-title>
          </v-list-item>
          <v-list-item dense style="background-color: #00897B" to="/signup">
            <v-list-item-title class="white--text">Sign up</v-list-item-title>
          </v-list-item>
        </v-card>
      </v-menu>

      <v-btn v-if="!islogged" dark text class="d-none d-sm-flex" to="/login">
        <span
          style="text-transform: capitalize; font-size: 16px;"
          class="home_text mr-1"
          >Log</span
        >
        <span
          style="text-transform: lowercase; font-size: 16px;"
          class="home_text"
          >in</span
        >
      </v-btn>
      <v-btn
        v-if="!islogged"
        to="/signup"
        color="teal darken-1"
        class="ml-1 pl-5 pr-5 d-none d-sm-flex"
        dark
      >
        <span style="text-transform: capitalize;" class="mr-1">Sign</span>
        <span style="text-transform: lowercase">up</span>
      </v-btn>

      <!--Logged-->
      <v-menu offset-y left transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-if="islogged" v-on="on">mdi-menu</v-icon>
        </template>
        <v-card width="300">
          <v-sheet color="#ECEFF1">
            <v-card-actions class="pa-5 mx-auto">
              <v-avatar color="pink" size="37" class="ml-2">
                <span class="white--text">M</span>
              </v-avatar>
              <div class="black--text caption ml-2" v-if="logged.attributes">
                {{ logged.attributes.username }}
              </div>
            </v-card-actions>
          </v-sheet>
          <v-divider></v-divider>
          <v-card-text>
            <v-btn height="40" color="red" block dark>
              <span style="text-transform: capitalize">log</span>
              <span style="text-transform: lowercase" class="ml-1">out</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-menu>
      <!--Logged-->
      <v-avatar color="pink" size="40" class="ml-2" v-if="islogged">
        <span class="white--text">M</span>
      </v-avatar>
    </v-app-bar>
    <!--Content-->
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="11" sm="10" md="11">
        <v-row justify="space-between" align="center">
          <v-col cols="12" md="5">
            <div class="home_title small_screen_text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus
            </div>
            <div class="home_text small_screen_text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus
              fugiat quos officia itaque numquam exercitationem nemo, minus
              accusantium delectus quo harum ducimus similique veniam,
              consequuntur tenetur illo. Quae, adipisci minima.
            </div>
            <v-row class="mt-5" dense justify="center">
              <v-col cols="12" sm="8" md="12" lg="4">
                <v-btn
                  block
                  color="teal darken-1"
                  height="55"
                  large
                  dark
                  class="home_button"
                  @click="createmeeting"
                >
                  <v-icon class="mr-2" small>mdi-group</v-icon>
                  <span class="button_text">New Meeting</span>
                </v-btn>
              </v-col>
              <v-col cols="12" sm="8" md="12" lg="8">
                <v-text-field
                  name="meeting_name"
                  single-line
                  color="#eeeeee"
                  v-model="item"
                  label="Enter code or link."
                  outlined
                  hide-details=""
                >
                  <template v-slot:prepend-inner>
                    <div>
                      <v-icon>mdi-keyboard</v-icon>
                    </div>
                  </template>
                  <template v-slot:append-outer>
                    <div v-if="item">
                      <a
                        @click="joinmeeting"
                        style="color: #00897B; font-weight: 500"
                        >Join</a
                      >
                    </div>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-divider class="mt-8"></v-divider>
            <div class="mt-2 home_text">
              Lorem ipsum dolor, sit amet consectetur
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-card elevation="5" style="border-radius: 10px">
              <v-img
                height="500"
                src="/video-conferencing-fatigue-and-how-to-avoid-it-loopup-blog-1024x660.jpg"
              ></v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!--/end-->
  </div>
</template>

<script>
// import { Auth } from "aws-amplify"
import { joinnewmeeting } from "../components/script";
export default {
  name: "Home",
  data() {
    return {
      item: "",
      islogged: false,
      logged: {},
      dialog: false
    };
  },
  // mouted
  mounted() {
    //this.logged = Auth.currentAuthenticatedUser()
  },
  methods: {
    // create meeting
    async createmeeting() {
      this.$router.push("/option-select");
    },
    // join meeting
    async joinmeeting() {
      const response = this.item.split(",");
      let event = JSON.stringify({
        action: "join",
        data: { group_name: `${response[1]}`, group_id: `${response[0]}` }
      });
      await joinnewmeeting(event);
      if (response[1] === "chat") {
        this.$router.push("/chat");
      } else {
        this.$router.push("/video");
      }
    }
  }
};
</script>

<style scooped lang="css">
.button_text {
  text-transform: capitalize;
  color: white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.home_section {
  height: 100vh;
}

@media only screen and (max-width: 960px) {
  .home_bar {
    margin-bottom: 5rem;
  }
  .small_screen_text {
    text-align: center;
  }
}

.home_title {
  font-size: 2em;
  font-weight: 410;
  color: black;
  margin-bottom: 1.5rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.home_text {
  color: #37474f;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
