const router = require("express");
const userRouter = router();
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} = require("../config");
const { auth } = require("../middleware/auth");

const bcrypt = require("bcrypt");
const z = require("zod");

userRouter.post("/signup", async function (req, res) {
  const requiredData = z.object({
    email: z.string().email().min(2).max(50),
    password: z.string().min(6).max(20),
    name: z.string().min(1).max(30),
  });

  const parsedData = requiredData.safeParse(req.body);

  if (!parsedData.success) {
    res.json({
      message: "incorrect input format",
      error: parsedData.error,
    });
    return;
  }

  try {
    const { email, password, name } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.json({ message: "User Already Exists !!" });

    const hashedPass = await bcrypt.hash(password, 5);

    const newUser = await userModel.create({
      email: email,
      password: hashedPass,
      name: name,
    });

    return res.json({
      message: "Data Saved Successfully",
      userId: newUser._id,
    });
  } catch (error) {
    console.log(error.message);
    return res.send(error.message);
  }
});

userRouter.post("/signin", async function (req, res) {
  const requiredData = z.object({
    email: z.string().email().min(2).max(50),
    password: z.string().min(6).max(20),
  });

  const parsedData = requiredData.safeParse(req.body);

  if (!parsedData.success) {
    res.json({
      message: "incorrect input format",
      error: parsedData.error,
    });
    return;
  }

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

    const passMatch = await bcrypt.compare(password, user.password);

    if (passMatch) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        JWT_USER_PASSWORD
      );

      res.cookie("token", token);
      res.json({
        message: "Sign in successfully--------",
        token: token,
        userId: user._id,
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
