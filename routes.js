let userController = require("./controllers/userController");
const auth = require("./middleware/auth");

let router = require("express").Router();
router.get("/", function (req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love!",
  });
});

//signup router

router.route("/user").post(userController.singUP);
router.route("/login").post(userController.signIn);
router.route("/res").post(auth, userController.testRoute);




module.exports = router;
