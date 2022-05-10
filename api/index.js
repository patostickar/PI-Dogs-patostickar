const server = require('./src/app.js');
const { conn, Temperament } = require('./src/db.js');
const { API_KEY } = process.env;
const axios = require('axios');

// Syncing all the models at once.

// conn.sync({ force: false }).then(() => {
//   server.listen(process.env.PORT, () => {
//     console.log('%s listening at 3001');
//     // Populate Temperaments table from API at runtime
//     axios
//       .get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
//       .then((res) => {
//         const temperamentsList = [];
//         res.data.map((dog) => {
//           if (dog.temperament) {
//             dog.temperament.split(', ').map((t) => temperamentsList.push(t));
//           }
//         });
//         return Array.from(new Set(temperamentsList)).map((t) => ({
//           name: t,
//         }));
//       })
//       .then(async (temperamentsList) => {
//         await Temperament.bulkCreate(temperamentsList).then(() =>
//           console.log('Dogs temperaments have been saved')
//         );
//       });
//   });
// });

conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('%s listening at 3001');
    // Populate Temperaments table from API at runtime
    axios
      .get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
      .then((res) => {
        const temperamentsList = [];
        res.data.map((dog) => {
          if (dog.temperament) {
            dog.temperament.split(', ').map((t) => temperamentsList.push(t));
          }
        });
        return Array.from(new Set(temperamentsList)).map((t) => ({
          name: t,
        }));
      })
      .then(async (temperamentsList) => {
        await Temperament.bulkCreate(temperamentsList).then(() =>
          console.log('Dogs temperaments have been saved')
        );
      });
  });
});
