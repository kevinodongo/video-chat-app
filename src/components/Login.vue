<template>
  <!--Login Component-->
  <div class="login">
    <v-row justify="center" align="center" class="fill-height" no-gutters>
      <v-col cols="12">
        <!--Login-->
        <div style="display: flex; justify-content: center;">
          <div class="sheet-container">
            <v-card-text class="pa-7">
              <v-form ref="form" v-model="valid" lazy-validation>
                <div class="black--text mb-1" style="font-size: 14px;">
                  Email address
                </div>
                <v-text-field
                  name="email-input"
                  data-email
                  v-model="email"
                  required
                  single-line
                  outlined
                  dense
                  :rules="emailRules"
                ></v-text-field>
                <div class="passwordText">
                  <div class="black--text mb-1" style="font-size: 14px;">
                    Password
                  </div>
                  <router-link
                    class="reset-button"
                    to="/"
                    style="text-decoration: none;"
                  >
                    <span style="font-weight: 700; color: purple"
                      >Forgot Password?</span
                    >
                  </router-link>
                </div>
                <v-text-field
                  name="password-input"
                  data-password
                  single-line
                  outlined
                  required
                  v-model="password"
                  dense
                  :rules="passwordRules"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                ></v-text-field>
                <v-btn
                  :loading="loading"
                  class="white--text submit-button"
                  color="purple"
                  block
                  :disabled="!valid"
                  large
                  @click="submit"
                >
                  <span
                    style="text-transform: capitalize; font-size: 16px;"
                    class="font-weight-regular"
                    >log in</span
                  >
                </v-btn>
              </v-form>
              <v-card-actions class="mx-auto pa-0 mt-5 mb-5">
                <v-divider></v-divider>
                <span class="mr-1 ml-1">OR</span>
                <v-divider></v-divider>
              </v-card-actions>
              <v-btn
                to="/signup"
                color="grey lighten-2"
                block
                class="mb-3 sign-up-button"
                elevation="0"
                large
                @click="submit"
              >
                <span
                  style="text-transform: capitalize; font-size: 16px;"
                  class="font-weight-regular"
                  >Sign up</span
                >
              </v-btn>
            </v-card-text>
          </div>
        </div>
        <!--/end-->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  name: "Login",
  data() {
    return {
      valid: true, // show valid form
      password: null, // show password
      email: null, // show email
      loading: false,
      isError: null, // show error
      show: false, // show password
      checking: false, // checking on log in
      passwordRules: [v => !!v || "Password is required"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
    };
  },
  // before destroy
  beforeDestroy() {
    clearInterval(this.interval);
  },
  // methods
  methods: {
    async submit() {
      const response = this.$refs.form.validate();
      if (response === false) {
        return;
      }
      this.loading = true;

      let username = this.email;
      let password = this.password;

      Auth.signIn(username, password);

      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }
};
</script>

<style scooped lang="css">
.login {
  height: 700px;
}
.passwordText {
  display: flex;
  justify-content: space-between;
}
@media only screen and (max-width: 600px) {
  .loginTitle {
    font-size: 19px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
  .loginText {
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
  .loginTitle {
    font-size: 20px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
  .loginText {
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
  .loginTitle {
    font-size: 22px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
  .loginText {
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
