/**
 * [ ] GET /dogs:
Obtener un listado de las razas de perro
Debe devolver solo los datos necesarios para la ruta principal

[ ] GET /dogs?name="...":
Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
Si no existe ninguna raza de perro mostrar un mensaje adecuado

[ ] Área donde se verá el listado de razas de perros. Deberá mostrar su:
Imagen
Nombre
Temperamento
Peso


 */
const { getDogs } = require("../services/getDogs");

module.exports.getDogs = async (req, res, next) => {
  const { name } = req.query;
  let dogs;
  name ? (dogs = await getDogs(name)) : (dogs = await getDogs());

  try {
    res.send(dogs);
  } catch (error) {
    next(error);
  }
};
