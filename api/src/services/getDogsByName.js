require('dotenv').config();
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');
const { simpleDogData } = require('../utils/simpleDogData');

module.exports.getDogsByName = async (name) => {
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
        order: [['createdAt', 'DESC']],
      };
  dbDogs = Dog.findAll(condition);

  // Destructure resolved promises arrays
  let [{ data: apiDogsData }, dbDogsData] = await Promise.all([
    apiDogs,
    dbDogs,
  ]);

  return [...simpleDogData(dbDogsData), ...simpleDogData(apiDogsData)];
};
