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
    memberIds: userId
  });

  console.log(newOrg);
  res.status(201).json({
    message: "Organization created successfully",
    newOrg,
  });
});

orgRouter.post("/add-user", auth, async function(req,res){
  const creatorId = req.userId;
   
  const orgDetail = await organizationModel.findOne({
    creatorId:creatorId
  });

  const orgId = orgDetail.orgId;

  const { email } = req.body;

  const userDetail = await userModel.findOne({
    email:email
  });

  const userId = userDetail.userId;

  await organizationModel.findOneAndUpdate({
    orgId,
    $addToSet: {memberIds: userId}
  })

  console.log("creator id: "+ creatorId);
  console.log("org id: "+ orgId);
  console.log("email: "+ email);
  console.log("user id: "+ userId);

  res.json({
    message:"fuck we did it "
  })

})

//get todo list
orgRouter.get("/",auth, async function(req, res) {
  
})



module.exports = {
  orgRouter,
};
