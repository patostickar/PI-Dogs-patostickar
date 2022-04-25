require("dotenv").config();
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { detailedDogData } = require("../utils/detailedDogData");

module.exports.getDogById = async (id) => {
  console.log("calling getDogById fc");

  let dog;

  // DB Dogs
  if (id.includes("-")) {
    dog = await Dog.findByPk(id, { include: Temperament });
  } else {
    // API Dogs
    const dogs = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );

    // console.log(dogs.data);
    dog = dogs.data.find((d) => d.id === parseInt(id));

    console.log(dog);
  }

  return dog ? detailedDogData(dog) : "No puppies found with that id ☹️";
};
