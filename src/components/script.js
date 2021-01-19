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

// disconnect from a session
// ensure you supply a connection id

// send a message to a channel

/**
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
