const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
// const passport = require("passport");
// const flash = require("connect-flash");
// const morgan = require("morgan");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");
const routes = require("./routes");

const User = require("./entity/user");
const dbConfig = require("./config/database.config");

const db = require("./db")(dbConfig.url);
// require("./config/passport.config")(passport);

var QB = require("quickblox");
var CREDENTIALS = {
  appId: 83051,
  authKey: "X25jEcPfwvcneQx",
  authSecret: "huuPpdER4Lcg365",
};

// const movieRouter = require("./routes/property-router");

// Create express application instance
const app = express();
const apiPort = process.env.PORT || 8080;

// Call midlewares
// app.use(morgan("dev"));
// app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(
//   session({
//     secret: "randomsecretkeyapi",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.static(path.join(__dirname, "..", "client")));
app.use(express.static(path.join(__dirname, "..", "client/build")));

//Set all routes from routes folder
// app.use("/", routes);

app.get("/testcreate", async (req, res) => {
  let user = new User();
  user.username = "admin";
  user.password = "admin";
  user.hashPassword();
  user.role = "ADMIN";
  await user.save(user);
});

app.get("/checkcreate", async (req, res) => {
  const user = await User.findOne({ _id: "5ed5348cd5e484137c29d5da" });
  const password = "admin";

  console.log(
    "finded user: ",
    user.checkIfUnencryptedPasswordIsValid(password)
  );
});

// Routes
// require("./routes/routes")(app, passport, User);

// app.post(
//   "/api/signup",
//   passport.authenticate("local-signup", {
//     successRedirect: "/",
//     failureRedirect: "/signup",
//   })
// );

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

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "..", "/client/build/index.html"));
// });

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
