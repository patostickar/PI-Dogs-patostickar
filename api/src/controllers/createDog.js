/*
[ ] POST /dog:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos
*/

module.exports.createDog = async (req, res, next) => {
  try {
    console.log("createDog");
  } catch (error) {
    next(error);
  }
};
