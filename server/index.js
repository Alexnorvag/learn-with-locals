const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

var QB = require("quickblox");
var CREDENTIALS = {
  appId: 83051,
  authKey: "X25jEcPfwvcneQx",
  authSecret: "huuPpdER4Lcg365",
};

// OR to create many QB instances
// var QuickBlox = require("quickblox").QuickBlox;
// var QB1 = new QuickBlox();
// var QB2 = new QuickBlox();

// const db = require("./db");
// const movieRouter = require("./routes/property-router");

const app = express();
const apiPort = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "client")));
app.use(express.static(path.join(__dirname, "..", "client/build")));

// db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/session/init", (req, res) => {
  res.send("Init page!");

  QB.init(CREDENTIALS.appId, CREDENTIALS.authKey, CREDENTIALS.authSecret);

  console.log("initialized!");
});

app.get("/session/create", (req, res) => {
  res.send("Creating page");

  var params = { email: "norvag@mail.ru", password: "Nxrvlg@mail.ru1672" };
  QB.createSession(params, function (err, result) {
    console.log("creating result: ", result);
  });
});

app.get("/session/auth/:login", (req, res) => {
  res.send("Auth page");
  const { login } = req.params;
  var params = { login, password: "Nxrvlg@mail.ru1672" };

  QB.login(params, function (err, result) {
    console.log("auth result: ", result);
  });
});

app.get("/session/connect/:userId", (req, res) => {
  res.send("Connect page");

  const { userId } = req.params;

  var userCredentials = {
    userId: userId,
    password: "Nxrvlg@mail.ru1672",
  };

  QB.chat.connect(userCredentials, function (error, contactList) {
    console.log("contactList: ", contactList);
  });
});

app.get("/user/create/:login", (req, res) => {
  res.send("User create");
  const { login } = req.params;
  var params = {
    login,
    password: "Nxrvlg@mail.ru1672",
  };

  QB.users.create(params, function (err, res) {
    if (err) {
      done.fail("Create user error: " + JSON.stringify(err));
    } else {
      console.log("creation success: ", res);
    }
  });
});

app.get("/chat/:opponent", (req, res) => {
  res.send("Chat room");

  const { opponent } = req.params;

  var params = {
    type: 2,
    occupants_ids: [opponent],
    name: "Hawaii relax team",
  };

  QB.chat.dialog.create(params, function (error, conversation) {
    console.log("chat: ", conversation);
  });
});

app.get("/chat/join/:userId", (req, res) => {
  res.send("Chat send message");

  const { userId } = req.params;

  var dialogJid = QB.chat.helpers.getRoomJidFromDialogId(
    "5ed03ccea28f9a75d20d3ea3"
  );
  QB.chat.muc.join(dialogJid, function (error, result) {
    console.log("result: ", result);
  });
});

app.get("/chat/sendmessage/:userId", (req, res) => {
  res.send("Chat send message");

  const { userId } = req.params;

  var message = {
    type: "groupchat",
    body: "How are you today?",
    extension: {
      save_to_history: 1,
      dialog_id: "5ed03ccea28f9a75d20d3ea3",
    },
    markable: 1,
  };

  var dialogJid = QB.chat.helpers.getRoomJidFromDialogId(
    "5ed03ccea28f9a75d20d3ea3"
  );
  console.log("dialogJid: ", dialogJid);
  QB.chat.muc.join(dialogJid, function (error, result) {
    console.log("result: ", result);

    message.id = QB.chat.send(dialogJid, message);

    console.log("Message id: ", message.id);

    QB.chat.onMessageListener = onMessage;

    function onMessage(userId, message) {
      console.log("message sent: ", message);
    }
  });
});

// app.use("/api", movieRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "/client/build/index.html"));
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
