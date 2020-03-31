const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

var Todo = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    priority: { type: Number, min: 0, max: 3, default: 0 },
    deadlineDate: { type: Date, required: false, default: "" },
    deadlineTime: { type: String, required: false },
    done: { type: Boolean, default: false },
    active: { type: Boolean, default: false }
  },
  { timestamps: true }
);

var List = new Schema(
  {
    title: { type: String, required: true },
    active: { type: Boolean, default: true },
    todo: { type: [Todo] }
  },
  { timestamps: true }
);

var UserSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    list: { type: [List] }
  },
  { timestamps: true }
);

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
