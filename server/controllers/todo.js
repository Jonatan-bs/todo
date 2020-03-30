const mongoose = require("mongoose");
const User = mongoose.models["user"];

module.exports = {
  create: async (req, res, next) => {
    let todo = {};
    const listID = req.body.listID;
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.start = req.body.start;
    todo.deadline = req.body.deadline;

    try {
      const user = await User.findOne({ _id: req.session.user_id });

      const list = user.list.find(x => x._id.toString() === listID);

      list.todo.push(todo);
      console.log(user);

      await user.save();
      res.status(201).json({ success: true, user });
    } catch (error) {
      res.status(500).send({ success: false, message: error });
    }
  }
};
