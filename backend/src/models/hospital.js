const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
{
  name: String,
  city: String,
  address: String,
  phone: String,
  rating: Number,

  departments: [String],

  queue: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("Hospital", hospitalSchema);