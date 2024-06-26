const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Samayisagood$boy';

//ROUTE 1: Create a user using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be of atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {

    let success = false;

    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
        //Check whether user with same email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
      }

      //generating salt using bcrypt package
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

      //Create a new User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user:{
            id: user.id
        }
      }

      //signing auth token
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authToken});
    } 
    //Catching errors and displaying it on the console
    catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);





//ROUTE 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post(
    "/login",
    [
      body("email", "Enter a valid email").isEmail(),
      body("password", "Enter a valid password").exists(),
    ],
    async (req, res) => {

        let success = false;

        //If there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        //getting user entered email and password
        const {email, password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user)
            {
                return res.status(400).json({success, error: "Please try to login with correct credentials"});
            }

            //comparing hashed password with bcrypt hashed password
            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare)
            {
              return res.status(400).json({success, error: "Please try to login with correct credentials"});
            }

            const data = {
                user:{
                    id: user.id
                }
              }
              //signing auth token
              const authToken = jwt.sign(data, JWT_SECRET);
              success = true;
              res.json({success, authToken});


        } 
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    }
);





//ROUTE 3: Get loggedin user details using: POST "/api/auth/getuser". login required
router.post(
    '/getuser',
    fetchuser, 
    async (req, res) => {

        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        } 
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    }
);





module.exports = router;
