const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const organizationSchema = new Schema({
  name: String,
  creatorId: { type: ObjectId, ref: "user", required: true },
  members: [{
      userId: { type: ObjectId, ref: "user" },
      role: { type: String, enum: ["creator", "member"], default: "member" },
    },],
  orgId: ObjectId,
});

const toDoSchema = new Schema({
  title: String,
  description: String,
  completed: { type: Boolean, default: false },
  // userId: { type: ObjectId, ref: "user" }
});

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const toDoModel = mongoose.model("todo", toDoSchema);
const organizationModel = mongoose.model("organization", organizationSchema);
const userModel = mongoose.model("user", userSchema);

module.exports = { toDoModel, organizationModel, userModel };
