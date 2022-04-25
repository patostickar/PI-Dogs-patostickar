/*
[x] POST /dog:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos

Ruta de creación de raza de perro: debe contener

[x] Un formulario controlado con JavaScript con los siguientes campos:
Nombre
Altura (Diferenciar entre altura mínima y máxima)
Peso (Diferenciar entre peso mínimo y máximo)
Años de vida
[x] Posibilidad de seleccionar/agregar uno o más temperamentos
[x] Botón/Opción para crear una nueva raza de perro
*/

const { createDog } = require("../services/createDog");

module.exports.createDog = async (req, res, next) => {
  const {
    name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    temperament,
    image,
    life_span,
  } = req.body;

  // Validate presence and typeof of mandatory inputs
  if (!name || !height_min || !height_max || !weight_min || !weight_max) {
    return res.status(400).send("Please send all the mandatory information");
  }
  if (
    typeof name !== "string" ||
    typeof height_min !== "number" ||
    typeof height_max !== "number" ||
    typeof weight_min !== "number" ||
    typeof weight_max !== "number"
  ) {
    return res
      .status(400)
      .send("Please send the information with valid input types");
  }
  // Validate typeof optional inputs
  if (
    (image && typeof image !== "string") ||
    (temperament && !Array.isArray(temperament)) ||
    (life_span && typeof life_span !== "number")
  ) {
    return res
      .status(400)
      .send("Please send the information with valid input types");
  }

  try {
    const dog = await createDog(req.body);
    res.status(201).send(`Puppy ${dog} created`);
  } catch (error) {
    next(error);
  }
};
