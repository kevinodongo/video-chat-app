<template>
  <div class="video-section">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="11" sm="10" md="11">
        <v-row justify="space-between" align="center">
          <v-col cols="12" md="5">
            <div v-if="loading" class="text-center">
              <div class="video_section_title text-center">
                Meeting setup...
              </div>
              <div class="video_section_text text-center">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </div>
              <v-progress-circular
                class="mt-3"
                :width="2"
                indeterminate
                color="teal"
              ></v-progress-circular>
            </div>
            <div v-else>
              <div class="video_section_title text-center">
                Meeting is ready!
              </div>
              <div class="video_section_text text-center">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </div>
              <v-row class="mt-5" dense justify="center">
                <v-col cols="12" sm="8" md="12" lg="4">
                  <v-btn
                    block
                    color="teal darken-1"
                    dark
                    large
                    @click="joinmeeting"
                    elevation="3"
                    class="video_section_button join_button"
                  >
                    <span class="video_button_text">Join Meeting</span>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="8" md="12" lg="4">
                  <v-btn
                    block
                    large
                    elevation="3"
                    @click="cancelMeeting"
                    color="teal darken-1"
                    outlined
                    class="video_section_button cancel_button"
                  >
                    <span class="video_button_text">Cancel</span>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-card elevation="5" style="border-radius: 10px">
              <v-card-text>
                <video width="100%" id="gum-local" autoplay playsinline></video>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Videostart",
  data() {
    return {
      loading: true,
      joined: true,
      items: [
        {
          name: "Tim Cook"
        }
      ],
      constraints: {
        audio: false,
        video: true
      }
    };
  },
  mounted() {
    this.initialize();
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  },
  methods: {
    // cancel meeting
    cancelmeeting() {
      this.$router.push("/")
    },
    // join meeting
    joinmeeting() {
      this.$router.push("/session")
    },
    async initialize(e) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          this.constraints
        );
        this.handleSuccess(stream);
        e.target.disabled = true;
      } catch (e) {
        this.handleError(e);
      }
    },
    handleSuccess(stream) {
      const video = document.querySelector("video");
      const videoTracks = stream.getVideoTracks();
      console.log("Got stream with constraints:", this.constraints);
      console.log(`Using video device: ${videoTracks[0].label}`);
      window.stream = stream; // make variable available to browser console
      video.srcObject = stream;
    },
    handleError(error) {
      if (error.name === "ConstraintNotSatisfiedError") {
        const v = this.constraints.video;
        this.errorMsg(
          `The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`
        );
      } else if (error.name === "PermissionDeniedError") {
        this.errorMsg(
          "Permissions have not been granted to use your camera and " +
            "microphone, you need to allow the page access to your devices in " +
            "order for the demo to work."
        );
      }
      this.errorMsg(`getUserMedia error: ${error.name}`, error);
    },
    errorMsg(msg, error) {
      const errorElement = document.querySelector("#errorMsg");
      errorElement.innerHTML += `<p>${msg}</p>`;
      if (typeof error !== "undefined") {
        console.error(error);
      }
    }
  }
};
</script>

<style scooped lang="css">
.video-section {
  height: 100vh;
}
.video_button_text {
  text-transform: capitalize;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.video_section_title {
  font-size: 1.5em;
  font-weight: 410;
  color: black;
  margin-bottom: 0.5rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.video_section_text {
  color: #37474f;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
