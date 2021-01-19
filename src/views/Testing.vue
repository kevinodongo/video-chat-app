<template>
  <div class="testing">
    <v-container grid-list-xs>
      <v-text-field name="name" label="Code" v-model="item"></v-text-field>
      <v-btn @click="loginusingaws4andcallapi" color="success">
        <span style="text-transform: capitalize">Submit a test</span>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
/*eslint-disable*/
import { Auth } from 'aws-amplify';
import axios from "axios";
var aws4 = require("aws4");
export default {
  data() {
    return {
      item: "",
    };
  },
  methods: {
    // testing function
    async loginusingaws4andcallapi() {
      /**
       * Authorization: AWS4-HMAC-SHA256 
         Credential=AKIAIOSFODNN7EXAMPLE/20130524/us-east-1/s3/aws4_request, 
        SignedHeaders=host;range;x-amz-date,
        Signature=fe5f80f77d5fa3beca038a248ff027d0445342fe2855ddc963176630326f1024
      */
      // aws4 will sign an options object as you'd pass to http.request, with an AWS service and region
      let message = "Hello World"
      var request = {
        host: "dxq6ynxhw4.execute-api.us-east-2.amazonaws.com",
        region: 'us-east-2',
        service: "execute-api",
        method: "POST",
        body: JSON.stringify(message),
        url:
          "https://dxq6ynxhw4.execute-api.us-east-2.amazonaws.com/production/@connections/" + this.item,
        path: "/@connections/"+ this.item,
      };
      console.log('REQUEST', request)
      const signedRequest = aws4.sign(request, { 
          secretAccessKey: process.env.VUE_APP_SECRET_ACCESS_KEY,
          accessKeyId: process.env.VUE_APP_ACCESS_KEY_ID,
       });
      console.log('SIGNED REQUEST', signedRequest)
      delete signedRequest.headers['Host'] // remove host header
      delete signedRequest.headers['Content-Length'] // remove content length
      let response = await axios(signedRequest);
      console.log('AXIOS RESPONSE', response)
    }
  }
};
</script>
