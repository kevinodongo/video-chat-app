<template>
  <!--Confirm form-->
  <div class="confirm">
    <v-snackbar v-model="snackbar" top color="teal" text rounded>
      Success! Please confirm your email.
    </v-snackbar>
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12">
        <div style="display: flex; justify-content: center;">
          <div class="sheet-container">
            <v-card-text class="pa-7">
              <div
                class="text-center signupTitle mt-2 mb-5"
                style="color: black"
              >
                Confirm — your email!
              </div>
              <v-alert
                color="error"
                border="left"
                class="mt-3"
                text
                v-if="error"
              >
                <span class="black--text">{{ error }}</span>
              </v-alert>
              <v-form ref="form" v-model="valid" lazy-validation>
                <div class="black--text mb-1" style="font-size: 14px;">
                  Email
                </div>
                <v-text-field
                  name="email"
                  data-email
                  v-model="email"
                  required
                  single-line
                  outlined
                  dense
                  :rules="emailRules"
                ></v-text-field>
                <div class="black--text mb-1" style="font-size: 14px;">
                  Password
                </div>
                <v-text-field
                  name="code"
                  single-line
                  outlined
                  data-password
                  required
                  hint="Check your email for the code"
                  persistent-hint
                  v-model="password"
                  dense
                  :rules="codeRules"
                ></v-text-field>
                <v-btn
                  :loading="loading"
                  color="#00897B"
                  block
                  tile
                  large
                  class="submit-button white--text mt-2"
                  @click="submit"
                >
                  <span
                    style="text-transform: capitalize; font-size: 16px;"
                    class="font-weight-regular"
                    >Confirm</span
                  >
                </v-btn>
              </v-form>
            </v-card-text>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
//import { Auth } from "aws-amplify";
export default {
  name: "Confirm",
  data() {
    return {
      snackbar: false,
      valid: true,
      error: null,
      loading: false,
      show: false,
      email: "",
      code: "",
      codeRules: [v => !!v || "Password is required"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  // mounted
  mounted() {
    this.snackbar = true;
  },
  // methods
  methods: {
    //confirm
    async submit() {
      const response = this.$refs.form.validate();
      if (response === false) {
        return;
      }
      this.loading = true;
      // eslint-disable-next-line no-unused-vars

      let username = this.email;
      let code = this.code;
      console.log(code, username);

      // Cognito Authentication using Amplify
      // After retrieveing the confirmation code from the user
      /**
       * await Auth.confirmSignUp(username, code)
        .then(() => {
          this.$router.push("/");
        })
        .catch(Error => {
          if (Error) {
            this.error = Error.message;
          }
        });
      */

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
    // end
  }
};
</script>

<style lang="css">
.confirm {
  height: 700px;
}
.passwordText {
  display: flex;
  justify-content: space-between;
}
@media only screen and (max-width: 600px) {
  .signupTitle {
    font-size: 19px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
  .signupText {
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }
  .sheet-container {
    border: 1px solid #e0e0e0;
    width: 350px;
    border-radius: 5px;
  }
}
@media only screen and (min-width: 600px) and (max-width: 960px) {
  .signupTitle {
    font-size: 20px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
  .signupText {
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }
  .sheet-container {
    border: 1px solid #e0e0e0;
    width: 350px;
    border-radius: 5px;
  }
}
@media only screen and (min-width: 960px) {
  .signupTitle {
    font-size: 22px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
  .signupText {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
  }
  .sheet-container {
    border: 1px solid #e0e0e0;
    width: 400px;
    border-radius: 5px;
  }
}
</style>
