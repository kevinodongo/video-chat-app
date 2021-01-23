<template>
  <div class="session">
    <v-dialog v-model="dialog" max-width="600px" transition="dialog-transition">
      <v-card>
        <v-app-bar flat color="red darken-1" dark>
          <div class="title font-weight-regular">Delete Meeting</div>
        </v-app-bar>
        <v-card-text class="text-center mt-8 mb-4">
          <div style="font-size: 18px; color: #37474F">
            You are about to close this meeting? Are you sure
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="pl-5 pr-5"
            outlined
            color="grey darken-1"
            @click="dialog = false"
          >
            <span style="text-transform: capitalize">cancel</span>
          </v-btn>
          <v-btn
            class="ml-1 pl-5 pr-5"
            dark
            :loading="loading"
            color="red darken-1"
            @click="deletecurrentchannel"
          >
            <span style="text-transform: capitalize">delete</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-navigation-drawer v-model="drawer" app width="350">
      <v-card-text>
        <div class="font-weight-light caption ml-2">VIEWERS</div>
        <div v-for="item in items" :key="item.id">
          <v-card height="150" class="mt-1">
            <div>{{ item.connectionId }}</div>
          </v-card>
        </div>
      </v-card-text>
    </v-navigation-drawer>
    <v-app-bar app color="white" flat justify="space-between">
      <v-icon @click="drawer = !drawer" color="black">mdi-sort-variant</v-icon>
      <div
        class="ml-2 teal--text"
        v-if="meeting_url"
        style="border: 2px dashed teal; padding: 5px"
      >
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on"
              ><span>{{ meeting_url }}</span></span
            >
          </template>
          <span>Share this with your users</span>
        </v-tooltip>
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="dialog = true" color="red" fab small dark class="mr-2">
        <v-icon>mdi-stop</v-icon>
      </v-btn>
      <v-menu offset-y left transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            v-on="on"
            color="black"
            @click="expand = !expand"
            >mdi-dots-vertical</v-icon
          >
        </template>
        <v-card width="250">
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
      </v-menu>
    </v-app-bar>
    <div class="content">
      <v-card min-width="500px" tile flat>
        <video width="100%" id="gum-local" autoplay playsinline></video>
      </v-card>
    </div>
  </div>
</template>

<script>
import {
  deletechannel,
  generateiceserversformaster,
  generateiceserversforviewer,
  stopmaster,
  stopviewer
} from "../components/script";
var randomize = require("randomatic");
export default {
  name: "Session",
  data() {
    return {
      selectedItem: [],
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
      dialog: false,
      item: {},
      loading: false,
      items: [{}, {}, {}, {}],
      grid: false,
      constraints: {
        audio: false,
        video: true
      },
      master: {
        signalingClient: null,
        localStream: null,
        remoteStreams: []
      },
      viewer: {
        signalingClient: null,
        localStream: null,
        remoteStreams: [],
        connection_id: null
      }
    };
  },
  // computed
  computed: {
    // get the current user
    currentuser() {
      return this.$store.state.currentuser;
    },
    // meeting url
    meeting_url() {
      return this.$store.state.meeting_url;
    }
  },
  async beforeDestroy() {
    this.deletecurrentchannel();
  },
  // mounted
  async mounted() {
    await this.getthecurrentuser();
  },
  // methods
  methods: {
    // get the current user and call the right action
    async getthecurrentuser() {
      if (this.currentuser === "MASTER") {
        this.initializemaster();
      } else if (this.currentuser === "VIEWER") {
        this.initializeviewer();
      } else {
        return;
      }
    },
    // initialize master user
    async initializemaster() {
      let localView = document.querySelector("video");
      this.master.localStream = await navigator.mediaDevices.getUserMedia(
        this.constraints
      );
      localView.srcObject = this.master.localStream;
      if (this.meeting_url) {
        const iceServers = await generateiceserversformaster(
          this.meeting_url, // meeting url
          this.master // master user
        );
        this.masterconfiguration(iceServers);
      }
    },
    // initialize viewer user
    async initializeviewer() {
      let localView = document.querySelector("video");
      this.master.localStream = await navigator.mediaDevices.getUserMedia(
        this.constraints
      );
      localView.srcObject = this.master.localStream;
      if (this.meeting_url) {
        this.viewer.connection_id = randomize("Aa0", 10);
        const iceServers = await generateiceserversforviewer(
          this.meeting_url, // meeting url
          this.viewer // viewer user
        );
        this.viewerconfiguration(iceServers);
      }
    },
    // master configuration
    async masterconfiguration(iceServers) {
      if (iceServers) {
        const configuration = {
          iceServers
        };
        this.master.signalingClient.on("open", async () => {
          console.log("[MASTER] Connected to signaling service");
        });
        this.master.signalingClient.on(
          "sdpOffer",
          async (offer, remoteClientId) => {
            console.log(
              "[MASTER] Received SDP offer from client: " + remoteClientId
            );

            // Create a new peer connection using the offer from the given client
            const peerConnection = new RTCPeerConnection(configuration);
            this.master.peerConnectionByClientId[
              remoteClientId
            ] = peerConnection;

            // Send any ICE candidates to the other peer
            peerConnection.addEventListener("icecandidate", ({ candidate }) => {
              console.log(
                "[MASTER] Generated ICE candidate for client: " + remoteClientId
              );

              // When trickle ICE is enabled, send the ICE candidates as they are generated.
              console.log(
                "[MASTER] Sending ICE candidate to client: " + remoteClientId
              );
              this.master.signalingClient.sendIceCandidate(
                candidate,
                remoteClientId
              );
              //else
              console.log(
                "[MASTER] All ICE candidates have been generated for client: " +
                  remoteClientId
              );

              // When trickle ICE is disabled, send the answer now that all the ICE candidates have ben generated.

              console.log(
                "[MASTER] Sending SDP answer to client: " + remoteClientId
              );
              this.master.signalingClient.sendSdpAnswer(
                peerConnection.localDescription,
                remoteClientId
              );
            });

            // As remote tracks are received, add them to the remote view
            peerConnection.addEventListener("track", event => {
              console.log(
                "[MASTER] Received remote track from client: " + remoteClientId
              );
              if (this.master.remoteView.srcObject) {
                return;
              }
              this.master.remoteView.srcObject = event.streams[0];
            });

            // If there's no video/audio, master.localStream will be null. So, we should skip adding the tracks from it.
            if (this.master.localStream) {
              this.master.localStream
                .getTracks()
                .forEach(track =>
                  peerConnection.addTrack(track, this.master.localStream)
                );
            }
            await peerConnection.setRemoteDescription(offer);

            // Create an SDP answer to send back to the client
            console.log(
              "[MASTER] Creating SDP answer for client: " + remoteClientId
            );
            await peerConnection.setLocalDescription(
              await peerConnection.createAnswer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true
              })
            );

            // When trickle ICE is enabled, send the answer now and then send ICE candidates as they are generated. Otherwise wait on the ICE candidates.
            console.log(
              "[MASTER] Sending SDP answer to client: " + remoteClientId
            );
            this.master.signalingClient.sendSdpAnswer(
              peerConnection.localDescription,
              remoteClientId
            );
          }
        );

        this.master.signalingClient.on(
          "iceCandidate",
          async (candidate, remoteClientId) => {
            console.log(
              "[MASTER] Received ICE candidate from client: " + remoteClientId
            );

            // Add the ICE candidate received from the client to the peer connection
            const peerConnection = this.master.peerConnectionByClientId[
              remoteClientId
            ];
            peerConnection.addIceCandidate(candidate);
          }
        );

        this.master.signalingClient.on("close", () => {
          console.log("[MASTER] Disconnected from signaling channel");
        });

        this.master.signalingClient.on("error", () => {
          console.error("[MASTER] Signaling client error");
        });

        console.log("[MASTER] Starting master connection");
        this.master.signalingClient.open();
      }
    },
    // viewer configuration
    async viewerconfiguration(iceServers) {
      const configuration = {
        iceServers
      };
      this.viewer.peerConnection = new RTCPeerConnection(configuration);
      this.viewer.signalingClient.on("open", async () => {
        console.log("[VIEWER] Connected to signaling service");

        // Create an SDP offer to send to the master
        console.log("[VIEWER] Creating SDP offer");
        await this.viewer.peerConnection.setLocalDescription(
          await this.viewer.peerConnection.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true
          })
        );

        console.log("[VIEWER] Sending SDP offer");
        this.viewer.signalingClient.sendSdpOffer(
          this.viewer.peerConnection.localDescription
        );

        console.log("[VIEWER] Generating ICE candidates");
      });
      this.viewer.signalingClient.on("sdpAnswer", async answer => {
        // Add the SDP answer to the peer connection
        console.log("[VIEWER] Received SDP answer");
        await this.viewer.peerConnection.setRemoteDescription(answer);
      });

      this.viewer.signalingClient.on("iceCandidate", candidate => {
        // Add the ICE candidate received from the MASTER to the peer connection
        console.log("[VIEWER] Received ICE candidate");
        this.viewer.peerConnection.addIceCandidate(candidate);
      });

      this.viewer.signalingClient.on("close", () => {
        console.log("[VIEWER] Disconnected from signaling channel");
      });

      this.viewer.signalingClient.on("error", error => {
        console.error("[VIEWER] Signaling client error: ", error);
      });

      // Send any ICE candidates to the other peer
      this.viewer.peerConnection.addEventListener(
        "icecandidate",
        ({ candidate }) => {
          if (candidate) {
            console.log("[VIEWER] Generated ICE candidate");

            console.log("[VIEWER] Sending ICE candidate");
            this.viewer.signalingClient.sendIceCandidate(candidate);
          } else {
            console.log("[VIEWER] All ICE candidates have been generated");

            console.log("[VIEWER] Sending SDP offer");
            this.viewer.signalingClient.sendSdpOffer(
              this.viewer.peerConnection.localDescription
            );
          }
        }
      );

      // As remote tracks are received, add them to the remote view
      this.viewer.peerConnection.addEventListener("track", event => {
        console.log("[VIEWER] Received remote track");
        if (this.viewer.remoteView.srcObject) {
          return;
        }
        this.viewer.remoteStream = event.streams[0];
        this.viewer.remoteView.srcObject = this.viewer.remoteStream;
      });

      console.log("[VIEWER] Starting viewer connection");
      this.viewer.signalingClient.open();
    },
    // delete channel
    async deletecurrentchannel() {
      this.loading = true;
      await deletechannel(this.meeting_url);
      setTimeout(() => {
        stopmaster();
        this.loading = false;
        this.dialog = false;
        this.$store.dispatch("saveurl", null);
        this.$store.dispatch("savecurrentuser", null);
        this.$router.push("/");
      }, 1000);
    },
    // stop viewer
    async stopviewerfromchannel() {
      stopviewer(this.viewer);
    },
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
