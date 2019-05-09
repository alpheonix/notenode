const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: {} }
);

userSchema.methods = {
  authenticate: (passwordToVerify, passwordHashed) => {
    return passwordHash.verify(passwordToVerify, passwordHashed);
  },
  getToken: () => {
    return jwt.encode(this, process.env.JWT_KEY || config.secret);
  }
};

module.exports = mongoose.model("User", userSchema);
