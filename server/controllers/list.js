const mongoose = require("mongoose");
const User = mongoose.models["user"];

module.exports = {
  create: async (req, res, next) => {
    const list = {};
    list.title = req.body.title;

    try {
      // const user = await User.findOne({ _id: req.session.user_id });
      let user = await User.find({}).limit(1);
      user = user[0];
      user.list.push(list);

      await user.save();
      res.status(201).json({ success: true, list: user.list });
    } catch (error) {
      res.status(500).send({ success: false, message: error });
    }
  },
  retrieve: async (req, res, next) => {
    try {
      // const user = await User.findOne({ _id: req.session.user_id });
      let user = await User.find({}).limit(1);
      user = user[0];

      res.status(201).json({ success: true, list: user.list });
    } catch (error) {
      res.status(500).send({ success: false, message: error });
    }
  },
  deActivate: async (req, res, next) => {
    const listID = req.body.listID;

    try {
      // const user = await User.findOne({ _id: req.session.user_id });
      // CustomerModel.update({_id: job.customer}, {$pull : {jobs : job._id}}, ...

      let user = await User.find({}).limit(1);
      user = user[0];

      const list = user.list.find(x => x._id.toString() === listID);

      list.active = false;

      await user.save();
      res.status(201).json({ success: true, list: user.list });
    } catch (error) {
      res.status(500).send({ success: false, message: error });
    }
  },
  update: async (req, res, next) => {
    const listID = req.body.listID;
    const title = req.body.title;

    try {
      // const user = await User.findOne({ _id: req.session.user_id });
      // CustomerModel.update({_id: job.customer}, {$pull : {jobs : job._id}}, ...

      let user = await User.find({}).limit(1);
      user = user[0];

      const list = user.list.find(x => x._id.toString() === listID);

      list.title = title;

      await user.save();
      res.status(201).json({ success: true, list: user.list });
    } catch (error) {
      res.status(500).send({ success: false, message: error });
    }
  }
};
