const express = require("express");
const orgTodoRouter = express.Router();
const { orgToDoModel } = require("../db");
const { auth } = require("../middleware/auth");

orgTodoRouter.post("/add", auth, async (req, res) => {
    try {
        const orgId = req.orgId;
        const { title, description } = req.body;
        const newOrgTodo = await orgToDoModel.create({ title, description, orgId });
        return res.json({ message: "To-Do Added Successfully", orgTodoId: newOrgTodo._id });
    } catch (error) {
        console.log(error.message);
        return res.send(error.message);
    }
});

orgTodoRouter.put("/update/:id", auth, async (req, res) => {

});

orgTodoRouter.delete("/remove/:id", auth, async (req, res) => {

});

orgTodoRouter.put("/markDone/:id", auth, async (req, res) => {

});

module.exports = { orgTodoRouter };