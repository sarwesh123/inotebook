const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
var fetchuser=require("../middleware/fetchuser");
const JWT_SECRET = 'Harryisagoodb$oy';
//We sending data which has password also if we send this req using get then password get be visible in lock file of your local computer

//Route1:  Create a user uing POST "/api/auth/createuser". Doesn't require Auth. No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 character").isLength({
      min: 5
    }),
  ],
  async (req, res) => {
    //If there are errors, return Bad request and the err
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check where the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      /*
To protect our password from hacker we will not store
password directly to database b/c if hacker will hack our 
database so he will be able to know all of our username and 
password. So we  will first add salt to password i,e some extra character 
and then will create hash of password using bcryptjs hashing. 
 */
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      /*
Jsonwebtoken is method to 
verify user because user will not
send user_id and password all the time.
So it will provide a token to user 
after authentication so that if user 
want to login to website they can do by using this token
*/
      const data = { user: { id: user.id } };
      //console.log(data);
      const authtoken = jwt.sign(data,JWT_SECRET);
      console.log(authtoken);
      res.send({authtoken,success:true});

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//Route 2: Authenticate a user using:POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /*
    Using the method of Destructuring we take out
    email and password outside of body
     */
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      //If user id is not found out in server data
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct Credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      //If password is not found in server data
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct Credentials" });
      }

      //User_email and password is correct will send back their data
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET );
      res.json({"authtoken":authtoken,success:true});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

//Route 3:Get loggedIn user details using: POST "/api/auth/getuser" .Login required
router.post("/getuser", fetchuser, async (req, res) => {
//Wiil creat a middleware. it will be called if any request will come to login requirements

  //If there are errors, return Bad request and the errors
  try {
    //Will be selecting all the details of the user except to  their password
    userId=req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch {
    console.log(error.message);
    res.status(500).send("Internal server error occured");
  }
});

module.exports = router;
