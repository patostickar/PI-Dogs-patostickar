/**
[x] GET /dogs:
Obtener un listado de las razas de perro
Debe devolver solo los datos necesarios para la ruta principal

[x] GET /dogs?name="...":
Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
Si no existe ninguna raza de perro mostrar un mensaje adecuado

[x] Área donde se verá el listado de razas de perros. Deberá mostrar su:
Imagen
Nombre
Temperamento
Peso
 */

const { getDogsByName } = require("../services/getDogsByName");

module.exports.getDogs = async (req, res, next) => {
  const { name } = req.query;

  // Por ahora lo dejo así, pero preferible usar una query para el sort o incluso hacer una función sort aparte
  try {
    let dogs = await getDogsByName(name);
    if (!dogs.length) return res.send("No puppies found with that name ☹️");

    dogs = dogs.sort((a, b) =>
      a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    );
    res.send(dogs);
  } catch (error) {
    next(error);
  }
};
