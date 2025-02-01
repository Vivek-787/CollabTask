
const express = require("express");
const todoRouter = express.Router();
const { toDoModel } = require("../db");
const { auth } = require("../middleware/auth");

todoRouter.post("/add", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = await toDoModel.create({ title, description });
    return res.json({ message: "To-Do Added Successfully", todoId: newTodo._id });
  } catch (error) {
    console.log(error.message);
    return res.send(error.message);
  }
});

todoRouter.put("/update/:id", auth, async (req, res) => {
  try {
    const todoId = req.params.id;
    const { title, description } = req.body;
    await toDoModel.findByIdAndUpdate(
      todoId,{ 
      title, description
    });
    
    return res.json({ message: "To-Do updated" });
  } catch (error) {
    console.log(error.message);
    return res.send(error.message);
  }
});

todoRouter.delete("/remove/:id", auth, async (req, res) => {
  try {
    await toDoModel.findByIdAndDelete(req.params.id);
    return res.json({ message: "To-Do Removed Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.send(error.message);
  }
});

todoRouter.put("/markDone/:id", auth, async (req, res) => {
  try {
    await toDoModel.findByIdAndUpdate(req.params.id, { completed: true });
    return res.json({ message: "To-Do Marked as Done" });
  } catch (error) {
    console.log(error.message);
    return res.send(error.message);
  }
});

module.exports = { todoRouter };