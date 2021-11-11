const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username can not be empty."],
      minLength: 4,
      maxLength: 12,
      unique: [true, "Username already exists."],
    },
    name: {
      type: String,
      required: [true, " Please provide a name."],
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "Please provide an email."],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
      unique: [true, "Email already exists."],
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minLength: 4,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
