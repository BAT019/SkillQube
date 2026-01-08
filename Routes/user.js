const express = require("express");
const Router = express.Router;
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");
const userRouter = Router();
const { user_auth } = require("../middleware/user_auth")

userRouter.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  await userModel.create({
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
  });
  res.json({
    message: "You are signed up successfully!",
  });
});

userRouter.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await userModel.findOne({
    email: email,
    password: password,
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_SECRET
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "User not found!",
    });
  }
});

userRouter.get("/purchases", user_auth, async function (req, res) {
  const userID = req.userID;
 const purchases =  await purchaseModel.find({
    userID,
  });
  const courseData = await purchaseModel.find({
    _id : { $in : purchases.map( x => x.courseID)}
  })
  res.json({
    purchases
  })
});

module.exports = {
  userRouter: userRouter,
};
