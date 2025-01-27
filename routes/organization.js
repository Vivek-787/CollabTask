const router = require("express");
const orgRouter = router();
const { userModel, organizationModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "user123";
const { auth } = require("../middleware/auth");

orgRouter.post("/", auth, async function (req, res) {
  const userId = req.userId;

  const { name } = req.body;
  const creatorRole = "creator";

  const newOrg = await organizationModel.create({
    name: name,
    creatorId: userId,
    role: creatorRole,
  });

  console.log(newOrg);
  res.status(201).json({
    message: "Organization created successfully",
    newOrg,
  });
});

module.exports = {
  orgRouter,
};
