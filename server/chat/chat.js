var QB = require("quickblox");

// OR to create many QB instances
var QuickBlox = require("quickblox").QuickBlox;
var QB1 = new QuickBlox();
var QB2 = new QuickBlox();

var CREDENTIALS = {
  appId: 83051,
  authKey: "X25jEcPfwvcneQx",
  authSecret: "huuPpdER4Lcg365",
};

QB.init(CREDENTIALS.appId, CREDENTIALS.authKey, CREDENTIALS.authSecret);

var params = { login: "garry", password: "garry5santos" };

QB.createSession(params, function (err, result) {
  // callback function
});
