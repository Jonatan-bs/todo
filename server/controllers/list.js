const mongoose = require("mongoose");
const User = mongoose.models["user"];

module.exports = {
  create: async (req, res, next) => {
    const list = {};
    list.title = req.body.title;

    try {
      const user = await User.findOne({ _id: req.session.user_id });
      user.list.push(list);
      await user.save();
      res.status(201).json({ success: true, user });
    } catch (error) {
      res.status(500).send({ success: false, message: error });
    }
  }
};
