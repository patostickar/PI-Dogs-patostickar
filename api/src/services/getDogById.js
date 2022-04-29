require('dotenv').config();
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db');
const axios = require('axios');
const { detailedDogData } = require('../utils/detailedDogData');

module.exports.getDogById = async (id) => {
  let dog;

  // DB Dogs
  if (id.includes('-')) {
    dog = await Dog.findByPk(id, { include: Temperament });
  } else {
    // API Dogs
    const dogs = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );

    dog = dogs.data.find((d) => d.id === parseInt(id));
  }

  return detailedDogData(dog);
};
