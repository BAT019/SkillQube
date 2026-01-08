const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const { courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");
const { admin_auth } = require("../middleware/admin_auth")

adminRouter.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  await adminModel.create({
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
  });
  res.json({
    message: "You are signed up successfully!",
  });
});

adminRouter.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const admin = await adminModel.findOne({
    email: email,
    password: password,
  });

  if (admin) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_SECRET
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

adminRouter.post("/course", admin_auth, async function (req, res) {
  const adminID = req.userID;
  const {title,description,price,imageURL} = req.body;
  const course = await courseModel.create({
    title,
    description,
    price,
    imageURL,
    creatorID: adminID
  });
  res.json({
    message : "Course Created!",
    courseID : course._id 
  })
});

adminRouter.put("/course", admin_auth, async function (req, res) {
  const adminID = req.userID;
  const {title,description,price,imageURL} = req.body;
  const course = await courseModel.updateOne({
    _id: course._id,
    creatorID : adminID
  },{
    title,
    description,
    price,
    imageURL,
  });
  res.json({
    message : "Course Updated!",
    courseID : course._id 
  })

});

adminRouter.get("/course/bulk", admin_auth, async function (req, res) {
   const adminID = req.userID;

   const courses = await courseModel.find({
    creatorID : adminID
  });
});

module.exports = {
  adminRouter: adminRouter,
};
