const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

var Todo = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  start: { type: String, required: true },
  deadline: { type: String, required: true },
  done: { type: Boolean, default: false }
});

var List = new Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false },
  todo: { type: [Todo] }
});

var UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  list: { type: [List] }
});

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function(plaintext) {
  return bcrypt.compareSync(plaintext, this.password);
};

module.exports = mongoose.model("user", UserSchema, "user");
