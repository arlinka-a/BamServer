const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

// user Shecma
const userShcema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
    },
    manager: {
      type: Boolean,
      required: true,
      default: false,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


userShcema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, 'thisisuser')
  
  this.token = token
  await this.save()
  
  return token
}

userShcema.virtual("requests", {
  ref: "Request",
  localField: "_id",
  foreignField: "owner",
});

// Hash the plain text password before saving
userShcema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// delets user task when user removed
userShcema.pre("remove", async function (next) {
  const user = this;
  await Request.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("User", userShcema);

module.exports = User;
