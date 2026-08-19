const Hospital = require("../models/hospital");
const hospitals = require("./hospitals");

const seedHospitals = async () => {
  const count = await Hospital.countDocuments();

  if (count === 0) {
    await Hospital.insertMany(hospitals);
    console.log("Hospitals Seeded");
  }
};

module.exports = seedHospitals;