const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
console.log("Connected to the database!")
mongoose.connect("mongodb+srv://BAT_COURSEDB:KNmREV3EvbfrZxgM@cluster0.foktzvm.mongodb.net/course-app")

// USer Schema
const userSchema = new Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String,
});

// Admin Schema
const adminSchema = new Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String,
});

// Course Schema
const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageURL: String,
  creatorID: ObjectId,
});

// Purchase Schema
const purchaseSchema = new Schema({
  courseID: ObjectId,
  userID: ObjectId,
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
userModel,
adminModel,
courseModel,
purchaseModel
}