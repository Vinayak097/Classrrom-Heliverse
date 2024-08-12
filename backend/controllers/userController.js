import User from "../models/user.js";

export async function getUsers(req, res) {
  const users = await User.find();
  res.status(200).json(users);
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const updates = req.body;
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  res.status(200).json(user);
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(204).send();
}
