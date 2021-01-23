// ==================================== (imports)
const WebSocket = require("isomorphic-ws");
const websocket_url = "wss://echo.websocket.org/";
const ws = new WebSocket(`${websocket_url}`);
// aws config file
var AWS = require("aws-sdk");
AWS.config.update({
  region: process.env.VUE_APP_MY_REGION,
  secretAccessKey: process.env.VUE_APP_SECRET_ACCESS_KEY,
  accessKeyId: process.env.VUE_APP_ACCESS_KEY_ID
});
const SignalingClient = require("amazon-kinesis-video-streams-webrtc")
  .SignalingClient;
// Create KVS client
const kinesisVideoClient = new AWS.KinesisVideo({
  region: process.env.VUE_APP_MY_REGION,
  accessKeyId: process.env.VUE_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.VUE_APP_SECRET_ACCESS_KEY
});
//var randomize = require("randomatic");
// impor store
import store from "../store";
//====================================

// generat group url
export const generateurl = event => {
  // You can create a logic and embed everything is a new url
  // And save and send to user
  return event;
};

/**
 * Action called
 * ==================
 * Open a connection
 * Create a meeting
 * Join a meeting
 * Send a message
 * ====================
 */

// on connect
const onConnect = event => {
  if (event !== undefined) {
    ws.send(event);
  }
};

// on incoming
let interval = 0;
const inComing = () => {
  ws.onmessage = function incoming(data) {
    let array = [];
    if (JSON.parse(data.data).source === "create") {
      array.push({
        name: JSON.parse(data.data).connection_id,
        createdAt: JSON.parse(data.data).createdAt
      });
      store.commit("saveurl", JSON.parse(data.data).connection_id);
      store.commit("saveusers", array);
    } else if (JSON.parse(data.data).source === "join") {
      const response = JSON.parse(data.data).connected_users;
      let array = [];
      response.forEach(el => {
        console.log(el);
        const value = Object.values(el.connectionId);
        array.push({
          name: value[0],
          createdAt: new Date()
        });
        store.commit("saveurl", el.group_id);
      });
      store.commit("saveusers", array);
    }
    if (data) {
      interval = 5000; // set the timeout to 5000
    }
    // set timeout
    // you will be disconnected after 10 min
    setTimeout(() => {
      pong();
    }, interval);
  };
};

// on close
const onClose = () => {
  ws.onclose = function close() {
    console.log("disconnected");
    interval = 0;
    clearTimeout(interval);
  };
};

// create a meeting
// eslint-disable-next-line no-unused-vars
const pong = () => {
  const msg = JSON.stringify({
    action: "send",
    data: "ping"
  });
  ws.send(msg);
};

export const createnewmeeting = event => {
  /**
   * Message format
   * ===================
   * const event = JSON.stringify({
   *   action: "createMeeting"
   *   data: "Room One" // incase you are only collecting room name
   *   data: { "group_name": "": user_name: "": ""}
   * })
   */
  ws.onopen = onConnect(event);
  onClose();
  inComing();
  ws.open();
};

// sample create meeting
export const joinnewmeeting = event => {
  ws.onopen = onConnect(event);
  onClose();
  inComing();
  ws.open();
};

// send message function
export const sendnewmessage = event => {
  onConnect(event);
  onClose();
  inComing();
  ws.open();
};

/**
 * Video session will involve the following steps
 * Master (Owner who creates a meeting)
 * Viewer (Viewers who join the meeting)
 * =====================================
 */

// Master function
export const createsignal = async event => {
  // 1. Create a signal channel
  const createSignalingChannelResponse = await kinesisVideoClient
    .createSignalingChannel({
      ChannelName: `${event}` /* required */,
      ChannelType: "SINGLE_MASTER"
    })
    .promise();
  console.log("[MASTER] Channel Name: ", createSignalingChannelResponse);
  return createSignalingChannelResponse;
};

// eslint-disable-next-line no-unused-vars
export const generateiceserversformaster = async (event, master) => {
  // 2. Get signaling channel ARN
  const describeSignalingChannelResponse = await kinesisVideoClient
    .describeSignalingChannel({
      ChannelName: `${event}`
    })
    .promise();
  const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
  console.log("[MASTER] Channel ARN: ", channelARN);

  // 3. Get signaling channel endpoints
  const getSignalingChannelEndpointResponse = await kinesisVideoClient
    .getSignalingChannelEndpoint({
      ChannelARN: channelARN,
      SingleMasterChannelEndpointConfiguration: {
        Protocols: ["WSS", "HTTPS"],
        Role: "MASTER"
      }
    })
    .promise();
  const endpointsByProtocol = getSignalingChannelEndpointResponse.ResourceEndpointList.reduce(
    (endpoints, endpoint) => {
      endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
      return endpoints;
    },
    {}
  );
  console.log("[MASTER] Endpoints: ", endpointsByProtocol);

  // 4. Create Signaling Client
  //window.KVSWebRTC.SignalingClient
  master.signalingClient = new SignalingClient({
    channelARN,
    channelEndpoint: endpointsByProtocol.WSS,
    role: "MASTER",
    region: process.env.VUE_APP_MY_REGION,
    credentials: {
      accessKeyId: process.env.VUE_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.VUE_APP_SECRET_ACCESS_KEY
    },
    systemClockOffset: kinesisVideoClient.config.systemClockOffset
  });

  // Get ICE server configuration
  const kinesisVideoSignalingChannelsClient = new AWS.KinesisVideoSignalingChannels(
    {
      region: process.env.VUE_APP_MY_REGION,
      accessKeyId: process.env.VUE_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.VUE_APP_SECRET_ACCESS_KEY,
      endpoint: endpointsByProtocol.HTTPS,
      correctClockSkew: true
    }
  );
  const getIceServerConfigResponse = await kinesisVideoSignalingChannelsClient
    .getIceServerConfig({
      ChannelARN: channelARN
    })
    .promise();
  const iceServers = [];
  // use either
  iceServers.push({
    urls: `stun:stun.kinesisvideo.${process.env.VUE_APP_MY_REGION}.amazonaws.com:443`
  });
  // OR
  getIceServerConfigResponse.IceServerList.forEach(iceServer =>
    iceServers.push({
      urls: iceServer.Uris,
      username: iceServer.Username,
      credential: iceServer.Password
    })
  );
  console.log("[MASTER] ICE servers: ", iceServers);
  return iceServers;
};

export const generateiceserversforviewer = async (event, viewer) => {
  // Get signaling channel ARN
  const describeSignalingChannelResponse = await kinesisVideoClient
    .describeSignalingChannel({
      ChannelName: event // channel name
    })
    .promise();
  const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
  console.log("[VIEWER] Channel ARN: ", channelARN);

  // Get signaling channel endpoints
  const getSignalingChannelEndpointResponse = await kinesisVideoClient
    .getSignalingChannelEndpoint({
      ChannelARN: channelARN,
      SingleMasterChannelEndpointConfiguration: {
        Protocols: ["WSS", "HTTPS"],
        Role: "VIEWER"
      }
    })
    .promise();
  const endpointsByProtocol = getSignalingChannelEndpointResponse.ResourceEndpointList.reduce(
    (endpoints, endpoint) => {
      endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
      return endpoints;
    },
    {}
  );
  console.log("[VIEWER] Endpoints: ", endpointsByProtocol);

  const kinesisVideoSignalingChannelsClient = new AWS.KinesisVideoSignalingChannels(
    {
      region: process.env.VUE_APP_MY_REGION,
      accessKeyId: process.env.VUE_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.VUE_APP_SECRET_ACCESS_KEY,
      endpoint: endpointsByProtocol.HTTPS,
      correctClockSkew: true
    }
  );

  // Get ICE server configuration
  const getIceServerConfigResponse = await kinesisVideoSignalingChannelsClient
    .getIceServerConfig({
      ChannelARN: channelARN
    })
    .promise();
  const iceServers = [];
  iceServers.push({
    urls: `stun:stun.kinesisvideo.${process.env.VUE_APP_MY_REGION}.amazonaws.com:443`
  });
  getIceServerConfigResponse.IceServerList.forEach(iceServer =>
    iceServers.push({
      urls: iceServer.Uris,
      username: iceServer.Username,
      credential: iceServer.Password
    })
  );
  console.log("[VIEWER] ICE servers: ", iceServers);

  // Create Signaling Client
  viewer.signalingClient = new SignalingClient({
    channelARN,
    channelEndpoint: endpointsByProtocol.WSS,
    clientId: viewer.connection_id,
    role: "VIEWER",
    region: process.env.VUE_APP_MY_REGION,
    credentials: {
      region: process.env.VUE_APP_MY_REGION,
      accessKeyId: process.env.VUE_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.VUE_APP_SECRET_ACCESS_KEY
    },
    systemClockOffset: kinesisVideoClient.config.systemClockOffset
  });
  return iceServers;
};

// stop viewer
export const stopviewer = viewer => {
  console.log("[VIEWER] Stopping viewer connection");
  if (viewer.signalingClient) {
    viewer.signalingClient.close();
    viewer.signalingClient = null;
  }

  if (viewer.peerConnection) {
    viewer.peerConnection.close();
    viewer.peerConnection = null;
  }

  if (viewer.localStream) {
    viewer.localStream.getTracks().forEach(track => track.stop());
    viewer.localStream = null;
  }

  if (viewer.remoteStream) {
    viewer.remoteStream.getTracks().forEach(track => track.stop());
    viewer.remoteStream = null;
  }

  if (viewer.localView) {
    viewer.localView.srcObject = null;
  }

  if (viewer.remoteView) {
    viewer.remoteView.srcObject = null;
  }
};

// stop master
export const stopmaster = master => {
  console.log("[VIEWER] Stopping viewer connection");
  if (master.signalingClient) {
    master.signalingClient.close();
    master.signalingClient = null;
  }

  if (master.peerConnection) {
    master.peerConnection.close();
    master.peerConnection = null;
  }

  if (master.localStream) {
    master.localStream.getTracks().forEach(track => track.stop());
    master.localStream = null;
  }

  if (master.remoteStream) {
    master.remoteStream.getTracks().forEach(track => track.stop());
    master.remoteStream = null;
  }

  if (master.localView) {
    master.localView.srcObject = null;
  }

  if (master.remoteView) {
    master.remoteView.srcObject = null;
  }
};

// delete channel
export const deletechannel = async event => {
  // 2. Get signaling channel ARN
  const describeSignalingChannelResponse = await kinesisVideoClient
    .describeSignalingChannel({
      ChannelName: `${event}`
    })
    .promise();
  const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
  console.log("[MASTER] Channel ARN: ", channelARN);
  // delete channel
  await kinesisVideoClient
    .deleteSignalingChannel({
      ChannelARN: `${channelARN}`
    })
    .promise();
};
