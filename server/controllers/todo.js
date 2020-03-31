const mongoose = require("mongoose");
const User = mongoose.models["user"];

module.exports = {
  create: async (req, res, next) => {
    try {
      let todo = {};
      const listID = req.body.listID;
      todo.title = req.body.todo.title;
      todo.description = req.body.todo.description;
      todo.start = req.body.todo.start;
      todo.deadlineDate = req.body.todo.deadlineDate;
      todo.deadlineTime = req.body.todo.deadlineTime;
      todo.priority = req.body.todo.priority;

      // const user = await User.findOne({ _id: req.session.user_id });
      let user = await User.find({}).limit(1);
      user = user[0];
      const list = user.list.find(x => x._id.toString() === listID);

      list.todo.push(todo);
      try {
        await user.save();
      } catch (error) {
        res.status(500).send({ success: false, error });
      }
      res.status(201).json({ success: true, user });
    } catch (error) {
      res.status(500).send({ success: false, error });
    }
  },
  retrieve: async (req, res, next) => {
    const listID = req.body.listID;
    try {
      // const user = await User.findOne({ _id: req.session.user_id });
      let user = await User.find({}).limit(1);
      user = user[0];
      // const list = user.list.find(x => x._id.toString() === listID);
      const list = user.list.id(listID);

      res.status(201).json({ success: true, todo: list.todo });
    } catch (error) {
      res.status(500).send({ success: false, message: error });
    }
  },
  done: async (req, res, next) => {
    const listID = req.body.listID;
    const todoID = req.body.todoID;

    try {
      // const user = await User.findOne({ _id: req.session.user_id });
      // CustomerModel.update({_id: job.customer}, {$pull : {jobs : job._id}}, ...

      let user = await User.find({}).limit(1);
      user = user[0];

      const list = user.list.id(listID);
      const todo = list.todo.id(todoID);

      // const list = user.list.find(x => x._id.toString() === listID);
      // const todo = list.todo.find(x => x._id.toString() === todoID);

      todo.done = true;

      await user.save();
      res.status(201).json({ success: true, todo: list.todo });
    } catch (error) {
      res.status(500).send({ success: false, message: error });
    }
  },
  update: async (req, res, next) => {
    const listID = req.body.listID;
    const todoID = req.body.todoID;
    const newTodo = req.body.todo;

    try {
      // const user = await User.findOne({ _id: req.session.user_id });
      // CustomerModel.update({_id: job.customer}, {$pull : {jobs : job._id}}, ...

      let user = await User.find({}).limit(1);
      user = user[0];

      const list = user.list.id(listID);
      const todo = list.todo.id(todoID);

      todo.title = newTodo.title;
      todo.deadlineDate = newTodo.deadlineDate;
      todo.deadlineTime = newTodo.deadlineTime;
      todo.description = newTodo.description;
      todo.priority = newTodo.priority;

      await user.save();
      res.status(201).json({ success: true, todo: list.todo });
    } catch (error) {
      res.status(500).send({ success: false, message: error });
    }
  },
  delete: async (req, res, next) => {
    const listID = req.body.listID;
    const todoID = req.body.todoID;

    try {
      // const user = await User.findOne({ _id: req.session.user_id });
      // CustomerModel.update({_id: job.customer}, {$pull : {jobs : job._id}}, ...

      let user = await User.find({}).limit(1);
      user = user[0];

      const list = user.list.id(listID);
      list.todo.id(todoID).remove();

      // let list = user.list.find(x => x._id.toString() === listID);
      // const todoIndex = list.todo.findIndex(x => x._id.toString() === todoID);

      // list.todo.splice(todoIndex, 1);

      await user.save();
      res.status(201).json({ success: true, todo: list.todo });
    } catch (error) {
      res.status(500).send({ success: false, message: error });
    }
  }
};
