<template>
  <!--login help-->
  <div class="login-help">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12">
        <div style="display: flex; justify-content: center;">
          <div class="sheet-container">
            <v-card-text class="pa-7">
              <div v-if="forgotPassword">
                <div class="text-center mt-3 black--text loginhelpTitle">
                  Forgot Your Password
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
                <div class="mt-4 loginhelpText">
                  Enter your
                  <span style="border-bottom: 2px dotted black"
                    >primary email address</span
                  >
                  and we’ll send you instructions on how to reset your password.
                </div>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <div class="black--text mb-2 mt-2">Email</div>
                  <v-text-field
                    :rules="emailRules"
                    required
                    data-email
                    name="email"
                    v-model="email"
                    single-line
                    outlined
                    dense
                  ></v-text-field>
                  <v-btn
                    @click="sendCode"
                    class="mb-3 white--text send-code-button"
                    color="teal darken-1"
                    block
                    :loading="loading"
                    large
                    tile
                  >
                    <span
                      style="text-transform: capitalize; font-size: 18px;"
                      class="font-weight-regular"
                      >Send Code</span
                    >
                  </v-btn>
                </v-form>
              </div>
              <div v-if="resetPassword">
                <div
                  class="text-center headline mt-3 black--text reset-password-title"
                >
                  Reset Your Password
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
                <v-form ref="form1" v-model="valid" lazy-validation>
                  <div class="black--text mb-2 mt-2">Email</div>
                  <v-text-field
                    :rules="emailRules"
                    required
                    data-email
                    name="email"
                    v-model="email"
                    single-line
                    outlined
                    disabled
                    dense
                  ></v-text-field>
                  <div class="black--text mb-2 mt-2">Code</div>
                  <v-text-field
                    :rules="inputRules"
                    required
                    name="code"
                    v-model="code"
                    type="number"
                    single-line
                    outlined
                    dense
                  ></v-text-field>
                  <div class="black--text mb-2 mt-2">New Password</div>
                  <v-text-field
                    name="password"
                    single-line
                    outlined
                    data-password
                    required
                    v-model="password"
                    dense
                    hint="At least 8 characters"
                    persistent-hint
                    :rules="inputRules"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                  ></v-text-field>
                  <v-btn
                    @click="changePassword"
                    class="mb-3 reset-button"
                    color="teal darken-1"
                    block
                    large
                    :loading="loading"
                    dark
                  >
                    <span
                      style="text-transform: capitalize; font-size: 18px;"
                      class="font-weight-regular"
                      >Reset Password</span
                    >
                  </v-btn>
                </v-form>
              </div>
            </v-card-text>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
//import { Auth } from 'aws-amplify'
export default {
  name: "LoginHelp",
  data() {
    return {
      valid: true,
      show: false,
      error: false,
      resetPassword: false,
      forgotPassword: true,
      email: "",
      password: "",
      code: "",
      inputRules: [v => !!v || "This field is required"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      loading: false
    };
  },
  // methods
  methods: {
    // send code
    async sendCode() {
      const response = this.$refs.form.validate();
      if (response === false) {
        return;
      }
      this.loading = true;
      const username = this.email;
      console.log(username);
      // Cognito Authentication using Amplify
      /**
       * await Auth.forgotPassword(username)
        .then(() => {
          this.forgotPassword = false;
          this.resetPassword = true;
        })
        .catch(Error => {
          if (Error) {
            this.error = Error.message;
          }
        });
      */
      // timeout
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    // change password
    async changePassword() {
      const response = this.$refs.form1.validate();
      if (response === false) {
        return;
      }
      this.loading = true;
      let username = this.email;
      let code = this.code;
      let new_password = this.password;
      console.log(username, code, new_password)

      // Collect confirmation code and new password , then
      /**
       * await Auth.forgotPasswordSubmit(username, code, new_password)
        .then(() => {
          this.$router.push("/")
        })
        .catch(Error => {
          if (Error) {
            this.error = Error.message;
          }
        });
      */

      // set timeout
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  }
};
</script>

<style scooped lang="css">
.login-help {
  height: 700px;
}
@media only screen and (max-width: 600px) {
  .loginhelpTitle {
    font-size: 19px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
  .loginhelpText {
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
  .loginhelpTitle {
    font-size: 20px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
  .loginhelpText {
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
  .loginhelpTitle {
    font-size: 22px;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
  }
  .loginhelpText {
    font-size: 15px;
    -webkit-font-smoothing: antialiased;
  }
  .sheet-container {
    border: 1px solid #e0e0e0;
    width: 400px;
    border-radius: 5px;
  }
}
</style>
