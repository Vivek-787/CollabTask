const express = require("express");
const orgTodoRouter = express.Router();
const { orgToDoModel } = require("../db");
const { auth } = require("../middleware/auth");

const z = require("zod");

orgTodoRouter.post("/add", auth, async (req, res) => {
  const requiredData = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(500),
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
    const { orgId } = req.cookies;
    const { title, description } = req.body;

    const newOrgTodo = await orgToDoModel.create({ title, description, orgId });

    return res.json({
      message: "To-Do Added Successfully",
      orgId: newOrgTodo._id,
    });
  } catch (error) {
    console.log(error.message);
    return res.send(error.message);
  }
});

orgTodoRouter.put("/update/:id", auth, async (req, res) => {
  const requiredData = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(500),
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
    const { orgId } = req.cookies;
    const orgTodoId = req.params.id;
    const { title, description } = req.body;

    const updateTodo = await orgToDoModel.findByIdAndUpdate(
      {
        orgId,
        _id: orgTodoId,
      },
      {
        title,
        description,
      }
    );

    return res.json({
      message: "To-Do updated Successfully",
      updateTodo,
    });
  } catch (error) {
    console.log(error.message);
    return res.send(error.message);
  }
});

orgTodoRouter.delete("/remove/:id", auth, async (req, res) => {
  try {
    const { orgId } = req.cookies;
    const orgTodoId = req.params.id;

    await orgToDoModel.findByIdAndDelete({
      orgId,
      _id: orgTodoId,
    });

    return res.json({ message: "To-Do deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.send(error.message);
  }
});

orgTodoRouter.put("/markDone/:id", auth, async (req, res) => {
  try {
    const { orgId } = req.cookies;
    const orgTodoId = req.params.id;

    const updatedTodo = await orgToDoModel.findByIdAndUpdate(
      { orgId, _id: orgTodoId },
      { completed: true }
    );

    return res.json({
      message: "To-Do marked complete Successfully",
      updatedTodo,
    });
  } catch (error) {
    console.log(error.message);
    return res.send(error.message);
  }
});

module.exports = { orgTodoRouter };
