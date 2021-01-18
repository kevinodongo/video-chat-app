<template>
  <div class="video">
    <v-sheet class="join-button">
      <v-btn dark color="purple" @click="joinmeeting">
        <span>Join meeting</span>
      </v-btn>
    </v-sheet>
    <v-row no-gutters>
      <template v-for="(item, index) in items">
        <v-col :key="index">
          <v-card outlined tile>
            <video width="100%" id="gum-local" autoplay playsinline></video>
          </v-card>
        </v-col>
        <v-responsive
          v-if="index === 3"
          :key="`width-${index}`"
          width="100%"
        ></v-responsive>
      </template>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  },
  methods: {
    // join meeting
    joinmeeting() {
      let item = {
        name: "Tim Cook"
      };
      this.items.push(item);
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
.join-button {
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 99;
}
</style>
