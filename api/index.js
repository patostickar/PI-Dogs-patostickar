const server = require("./src/app.js");
const { conn, Temperament } = require("./src/db.js");
const { API_KEY } = process.env;
const axios = require("axios");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001");
    // Populate Temperaments table from
    let temperamentsList = [];
    axios
      .get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
      .then((res) => {
        res.data.map((dog) => {
          if (dog.temperament) {
            dog.temperament.split(", ").map((t) => temperamentsList.push(t));
          }
        });
        temperamentsList = Array.from(new Set(temperamentsList)).map((t) => ({
          name: t,
        }));
      })
      .then(async () => {
        await Temperament.bulkCreate(temperamentsList).then(() =>
          console.log("Dogs temperaments have been saved")
        );
      });
  });
});
