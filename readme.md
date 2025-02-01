-My TODO
user->
myTodo/add-todo
myTodo/
myTdo/dlt-todo

- ORG Todo

  org
  org/add
  org/ ( post create )
  org/ ( get to see)
  org/add-user
  org/remove-user
  org/todo/add
  org/todo/delete
  org/todo/


const router = require("express"); 
const orgRouter = router();
const { userModel, organizationModel } = require("../db");
// const jwt = require("jsonwebtoken");
// const JWT_USER_PASSWORD = "user123";
const { auth } = require("../middleware/auth");
const mongoose = require("mongoose");

orgRouter.post("/", auth, async function (req, res) {
  try {
    const userId = req.userId;
    const { name } = req.body;

    // Ensure `userId` is a valid ObjectId
    const creatorObjectId = new mongoose.Types.ObjectId(userId);

    // Create the organization with the creator stored in `members`
    const newOrg = await organizationModel.create({
      name,
      creatorId: creatorObjectId,
      members: [{ userId: creatorObjectId, role: "creator" }] ,
    });
    console.log(newOrg);
    console.log(creatorObjectId);
    
    res.status(201).json({
      message: "Organization created successfully",
      organization: newOrg,
    });
  } catch (error) {
    console.error("Error creating organization:", error);
    res.status(500).json({ message: "create org Internal server error" });
  }
});

orgRouter.post("/add-user", auth, async function (req, res) {
  try {
    const creatorId = req.userId; // Get the creator's ID from auth middleware
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "User email is required" });
    }

    // Find the organization where the current user is the creator
    const orgDetail = await organizationModel.findOne({ creatorId });

    if (!orgDetail) {
      return res.status(404).json({ message: "Organization not found or you are not the creator" });
    }

    // Find the user to be added using their email
    const userDetail = await userModel.findOne({ email });

    if (!userDetail) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = userDetail._id;

    // Check if the user is already in the organization
    const isAlreadyMember = orgDetail.members.some(member =>
      member.userId.equals(userId)
    );

    if (isAlreadyMember) {
      return res.status(400).json({ message: "User is already a member" });
    }

    // Add user as a member
    await organizationModel.findOneAndUpdate(
      { _id: orgDetail._id },
      { $push: { members: { userId, role: "member" } } }
    );

    console.log(`Creator ID: ${creatorId}`);
    console.log(`Org ID: ${orgDetail._id}`);
    console.log(`User Email: ${email}`);
    console.log(`User ID: ${userId}`);

    res.json({ message: "User added to organization successfully" });
  } catch (error) {
    console.error("Error adding user to organization:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});



//get todo list
// orgRouter.get("/",auth, async function(req, res) {
  
// })



module.exports = {
  orgRouter,
};
