const { Temperament } = require("../db");

module.exports.getTemperaments = async () => {
  return await Temperament.findAll();
};
