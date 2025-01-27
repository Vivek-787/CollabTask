const router = require("express");
const userRouter = router();
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "user123";
const { auth } = require("../middleware/auth");

userRouter.post("/signup", async function (req, res) {
  try {
    const { email, password, name } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.json({ message: "User Already Exists !!" });

    await userModel.create({
      email: email,
      password: password,
      name: name,
    });

    return res.json("Data Saved Successfully");
  } catch (error) {
    console.log(error.message);
    return res.send(error.message);
  }
});

userRouter.post("/signin", async function (req, res) {
  try {
    const { email, password, name } = req.body;

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.json({
        message: "user does not exist",
      });
    }

    const passMatch = true;

    if (passMatch) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        JWT_USER_PASSWORD
      );

      // res.json({
      //   token: token,
      // });
      res.cookie("token", token);
      res.json({
        message: "Sign in successfully--------",
      });
    } else {
      throw new Error("pass Match error");
    }
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

module.exports = {
  userRouter,
};
