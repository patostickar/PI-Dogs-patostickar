/*
[x] GET /temperament:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
*/

const { getTemperaments } = require("../services/getTemperaments");

module.exports.getTemperaments = async (req, res, next) => {
  try {
    const temperaments = await getTemperaments();
    res.json(temperaments);
  } catch (error) {
    next(error);
  }
};
