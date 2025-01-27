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

//create org
// orgRouter.post("/",auth ,async function(req,res){
// const userId = req.userId;

// const {name } = req.body;

// const newOrg = await organizationModel.create({
// name:name,
// creatorId: userId,
// members: [{ user: req.userId, role: 'creator' }]
// })

// res.status(201).json({
// message: 'Organization created successfully'
// });

// });

// //get todos inside organization
// orgRouter.get("/",auth ,async function(req,res){

// });

// orgRouter.post("/add-user",auth ,async function(req,res){
// const creatorId = req.userId;

// const { email, name } =req.body;

// const newUser = await userModel.findOne({
// email
// })

// const newUserId = newUser.map(addUser =>addUser.userId)

// const userInOrg = await organizationModel.find({
// \_id: newUserId
// })

// if(!userInOrg){
// await organizationModel.create({
// name,
// creatorId:creatorId,
// members: [{user:newUserId, role: "member"}]
// })
// }

// });
