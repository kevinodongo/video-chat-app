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

            <!--Link-->
            <v-row justify="center">
              <v-col cols="12" md="6">
                <v-sheet class="mt-5" color="#E0F2F1">
                  <v-card-text class="text-center">
                    <div class="link_text">
                      123456789
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
                  to="/chat"
                  outlined
                  elevation="3"
                  class="option_section_button"
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
                  to="/video"
                  large
                  outlined
                  elevation="3"
                  class="option_section_button"
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
export default {
  name: "Option",
  data() {
    return {
      overlay: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.overlay = false;
    }, 1000);
  },
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
