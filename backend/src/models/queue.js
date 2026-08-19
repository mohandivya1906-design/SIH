const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
{
  tokenNumber: String,

  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },

  status: {
    type: String,
    enum: ["waiting", "serving", "completed"],
    default: "waiting",
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("Queue", queueSchema);