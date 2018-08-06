const AuthenticationController = require("./controllers/AuthenticationController");
const ACPolicy = require("./policies/AuthenticationControllerPolicy");

module.exports = app => {
  app.post("/register", ACPolicy.register, AuthenticationController.register);
};
