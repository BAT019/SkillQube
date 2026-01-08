const express = require("express");
const Router = express.Router;
const{purchaseModel} = require("../db")
const{courseModel} = require("../db")
const courseRouter = Router();
const { user_auth } = require("../middleware/user_auth")

courseRouter.post("/purchase", user_auth, async function (req, res) {
 const userID = req.userID;
 const courseID = req.body.courseID;
 await purchaseModel.create({
  userID,
  courseID
 })
 res.json({
  message : "You have succcessfully purchased the course!"
 })
});

courseRouter.get("/preview", async function (req, res) {
  const courses = await courseModel.find({});
  res.json({
    courses
  })
});

module.exports = {
  courseRouter: courseRouter,
};
