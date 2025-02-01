const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const { userRouter } = require("./routes/user");
const { orgRouter } = require("./routes/organization");
const { todoRouter } = require("./routes/myTodo");


app.use("/todo", todoRouter);
app.use("/user", userRouter);
app.use("/organization", orgRouter);

const main = async () => {
  try {
    await mongoose.connect("mongodb+srv://viveksanandiya787:mT6mqcz8pOZeGU5i@cluster0.7f2f6.mongodb.net/todo-copy");

    app.listen(3000, () => {
      console.log("Connected Successfully");
    });
  } catch (error) {
    console.log("Db problem" + error.message);
  } 
}; 

main();
