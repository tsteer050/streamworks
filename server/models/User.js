// -User
//   - Library
//   - Auth stuff
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  library: {
    type: Schema.Types.ObjectId,
    ref: "libraries"
  }

})

module.exports = mongoose.model("users", UserSchema);