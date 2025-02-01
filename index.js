require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const { userRouter } = require("./routes/user");
const { orgRouter } = require("./routes/organization");
const { todoRouter } = require("./routes/myTodo");
const {orgTodoRouter } = require("./routes/orgTodo");


app.use("/todo", todoRouter);
app.use("/user", userRouter);
app.use("/organization", orgRouter);
app.use("/orgTodo", orgTodoRouter);

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    app.listen(3000, () => {
      console.log("Connected Successfully");
    });
  } catch (error) {
    console.log("Db problem" + error.message);
  } 
}; 

main();
