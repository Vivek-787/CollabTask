const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const { userRouter } = require("./routes/user");
const { orgRouter } = require("./routes/organization");

app.use("/user", userRouter);
app.use("/organization", orgRouter);

const main = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sohamkgaikwad:bMLsPm9QclQ6GTWo@first.gjolh.mongodb.net/to_do_list"
    );

    app.listen(3000, () => {
      console.log("Connected Successfully");
    });
  } catch (error) {
    console.log("Db problem" + error.message);
  }
};

main();
