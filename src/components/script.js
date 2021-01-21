import axios from "axios";
var aws4 = require("aws4");
var AWS = require("aws-sdk");
AWS.config.update({
  region: process.env.VUE_APP_MY_REGION,
  secretAccessKey: process.env.VUE_APP_SECRET_ACCESS_KEY,
  accessKeyId: process.env.VUE_APP_ACCESS_KEY_ID
});

// post a request for connection
// ensure you supply a connection id
export const joinconnection = async () => {
  let request = {
    host: "ykbxv34xg0.execute-api.us-east-2.amazonaws.com",
    method: "POST",
    url:
      "https://ykbxv34xg0.execute-api.us-east-2.amazonaws.com/production/@connections",
    path: "/production/@connections"
  };

  let signedRequest = aws4.sign(request, {
    // assumes user has authenticated and we have called
    // AWS.config.credentials.get to retrieve keys and
    // session tokens
    secretAccessKey: AWS.config.credentials.secretAccessKey,
    accessKeyId: AWS.config.credentials.accessKeyId,
    sessionToken: AWS.config.credentials.sessionToken
  });

  delete signedRequest.headers["Host"];
  delete signedRequest.headers["Content-Length"];

  let response = await axios(signedRequest);
  console.log("RESPONSE", response);
  // handle response
};


/**
 * 
 * const WebSocket = require("isomorphic-ws");
const ws = new WebSocket(
  "wss://isrqhhttkl.execute-api.us-east-2.amazonaws.com/production"
);
 *  onConnect(event) {
      console.log("This is the link inside", event);
      if (event !== undefined) {
        ws.send(event);
      }
    },
    onMessage(event) {
      if (event !== undefined) {
        console.log("Event", event);
      }
    },
    // sample create @ connection
    async createameeting() {
      let message = JSON.stringify({
        action: "create",
        data: event
      });
      ws.onopen = this.onConnect(message);

      ws.onclose = function close() {
        console.log("disconnected");
      };

      ws.onmessage = function incoming(data) {
        console.log("INCOMING MESSAGE", data);
      };
    },
    // sample create @ connection
    async joinameeting() {
      let message = JSON.stringify({
        action: "join",
        data: { group_name: "Kevin Odongo", group_id: `${this.link}` }
      });
      ws.onopen = this.onConnect(message);
      ws.onclose = function close() {
        console.log("disconnected");
      };

      ws.onmessage = function incoming(data) {
        console.log("INCOMING MESSAGE", data);
      };
    },
    // sample create @ connection
    async sendamessage() {
      let message = JSON.stringify({
        action: "send",
        data: "Hello World"
      });
      this.onConnect(message);

      ws.onclose = function close() {
        console.log("disconnected");
      };

      ws.onmessage = function incoming(data) {
        console.log("INCOMING MESSAGE", data);
      };
    }
  }
*/

// disconnect from a session
// ensure you supply a connection id

// send a message to a channel

/**
 * // get session token
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
 * console.log(connectionId)
  const response = await axios({
    url: `https://yhnmv3htfa.execute-api.us-east-2.amazonaws.com/production/@connections/${connectionId}`,
    method: "post",
    headers: {
      Accept: "application/json",
      "Accept-Language": "en_US",
    }
  });
  console.log(response);
*/
