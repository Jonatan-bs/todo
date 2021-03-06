const mongoose = require("mongoose");
const User = mongoose.models["user"];
const handler = require("./handler");

module.exports = {
  register: (req, res, next) => {
    req.body.email = req.body.email ? req.body.email.toLowerCase() : null;
    const user = new User({ ...req.body });
    user
      .save()
      .then(user => {
        req.session.authenticated = true; // set session vars
        req.session.user_id = user._id; // set session vars

        res.status(201).json({ message: "User was created" });
      })
      .catch(err => res.status(500).json(err));
  },
  login: async (req, res, next) => {
    const verified = await handler.verifyUser(req);
    if (verified.success) {
      verified.user = {
        _id: verified.user._id,
        firstname: verified.user.firstname,
        lastname: verified.user.lastname,
        email: verified.user.email
      };
      res.status(201).json(verified);
    } else {
      res.status(500).json({ success: false });
    }
  },

  logout: (req, res, next) => {
    req.session.destroy(function(err) {
      if (err) res.status(500);
      res.status(201).json({ message: "logged out" });
    });
  }
};
