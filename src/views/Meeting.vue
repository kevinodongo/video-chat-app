<template>
  <div class="meeting_section">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="11">
        <v-row justify="space-between" align="center">
          <v-col cols="12" md="5">
            <div class="headline font-weight-black mb-5">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus
            </div>
            <div class="meeting_text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus
              fugiat quos officia itaque numquam exercitationem nemo, minus
              accusantium delectus quo harum ducimus similique veniam,
              consequuntur tenetur illo. Quae, adipisci minima.
            </div>
            <v-row align="center" class="mt-5">
              <v-btn
                @click="interractwithapi"
                color="purple"
                dark
                height="55"
                large
                class="mr-2"
              >
                <v-icon class="mr-2">mdi-video</v-icon>
                <span style="text-transform: capitalize;">Start meeting</span>
              </v-btn>
              <v-col cols="12" md="6">
                <v-text-field
                  name="meeting_input"
                  hide-details=""
                  v-model="link"
                  prepend-inner-icon="mdi-keyboard"
                  label="Enter a link"
                  id="meeting_input"
                  single-line
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-10">
              <v-divider></v-divider>
            </v-row>
            <v-row class="mt-5">
              <div class="meeting_text">Quae, adipisci minima.</div>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-card height="500" elevation="5">
              <v-img src="/video-conference-5352757_640.png" contain></v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import axios from "axios";
var aws4 = require("aws4");
export default {
  data() {
    return {
      link: "",
      logged: {}
    };
  },
  async mounted() {
    this.logged = await Auth.currentAuthenticatedUser();
  },
  methods: {
    // create meeting
    createmeeting() {
      this.$router.push("/video");
    },
    // get session token
    async interractwithapi() {
      console.log("clicked.....");
      let request = {
        host: "ykbxv34xg0.execute-api.us-east-2.amazonaws.com",
        method: "POST",
        "Access-Control-Allow-Origin": "*",
        url:
          "https://ykbxv34xg0.execute-api.us-east-2.amazonaws.com/production/@connections/ZYjaNeJQCYcCFVQ=",
        path: "/production/@connections/ZYjaNeJQCYcCFVQ="
      };
      let signedRequest = aws4.sign(request, {
        secretAccessKey: process.env.VUE_APP_SECRET_ACCESS_KEY,
        accessKeyId: process.env.VUE_APP_ACCESS_KEY_ID,
        sessionToken: this.logged.signInUserSession.accessToken.jwtToken
      });
      console.log(signedRequest);

      delete signedRequest.headers["Host"];
      delete signedRequest.headers["Content-Length"];

      let response = await axios(signedRequest);
      console.log("RESPONSE", response);
    },
    // sample create @ connection
    samplewebsocket() {
      const WebSocket = require("isomorphic-ws");
      const ws = new WebSocket(
        "wss://ykbxv34xg0.execute-api.us-east-2.amazonaws.com/production"
      );
      ws.onopen = function open() {
        let message = JSON.stringify({
          action: "onMessage",
          data: "This is message from Kevin Odongo"
        });
        ws.send(message);
      };

      ws.onclose = function close() {
        console.log("disconnected");
      };

      ws.onmessage = function incoming(data) {
        console.log("INCOMING MESSAGE", data);
      };
    },
    // sample @ connection request
    sampleconnection() {
      //
    }
    // end
  }
};
</script>

<style lang="css">
.meeting_section {
  height: 100vh;
}
.meeting_text {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
