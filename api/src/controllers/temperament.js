/*
[ ] GET /temperament:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
*/

module.exports.temperament = async (req, res, next) => {
  try {
    console.log("temperament");
  } catch (error) {
    next(error);
  }
};
