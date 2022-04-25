require("dotenv").config();
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

module.exports.getDogs = async (name) => {
  console.log("calling getDogs fc");

  // API Dogs
  // Chose API enpoint depending on presence of name
  let apiDogs;
  name
    ? (apiDogs = axios.get(
        `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`
      ))
    : (apiDogs = axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      ));

  // DB Dogs
  // Modify condition depending on presence of name
  let dbDogs;
  const condition = name
    ? {
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: Temperament,
      }
    : {
        include: Temperament,
      };
  dbDogs = Dog.findAll(condition);

  // Destructure resolved promises arrays
  let [{ data: apiDogsData }, dbDogsData] = await Promise.all([
    apiDogs,
    dbDogs,
  ]);

  // Format response
  // Falta resolver image de perros de la DB
  function formatDog(dogData) {
    return dogData.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        weight: dog.weight?.metric || dog.weigth,
        temperament:
          dog?.temperament ||
          dog.dataValues?.Temperaments.map((t) => t.dataValues.name).join(", "),
        image: dog?.reference_image_id || dog?.image,
      };
    });
  }

  let response = [...formatDog(apiDogsData), ...formatDog(dbDogsData)];
  return response.length ? response : "No puppies found with that name :(";
};
