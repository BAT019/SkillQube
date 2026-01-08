require('dotenv').config()
// External dependencies
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Atharv019";
// Internal Dependencies
const { userRouter } = require("./Routes/user");
const { courseRouter } = require("./Routes/course");
const { adminRouter } = require("./Routes/admin");

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main(){
   await mongoose.connect(process.env.MONGO_URL)
   app.listen(3000);
   console.log("Listening on 3000!")
}

main()
