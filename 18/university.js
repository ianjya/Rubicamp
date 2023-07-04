import User from "./controllers/user.js";

function startLoginSystem() {
  User.start();

  User.login();
}

startLoginSystem();
