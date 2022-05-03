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

const { createDog } = require('../services/createDog');

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

  // Validate presence, typeof and constraints of mandatory inputs
  if (!name || !height_min || !height_max || !weight_min || !weight_max) {
    return res.status(400).send('Please send all the mandatory information');
  }
  if (
    typeof name !== 'string' ||
    !/^[a-zA-Z ]*$/.test(name) ||
    typeof height_min !== 'number' ||
    height_min <= 0 ||
    height_min > height_max ||
    typeof height_max !== 'number' ||
    height_max <= 0 ||
    typeof weight_min !== 'number' ||
    weight_min <= 0 ||
    weight_min > weight_max ||
    typeof weight_max !== 'number' ||
    weight_max <= 0
  ) {
    return res
      .status(400)
      .send(
        'Please send the mandatory information with valid input types or congruent information'
      );
  }
  // Validate typeof optional inputs if present

  const findDuplicates = (arr) => arr.filter((v, i) => arr.indexOf(v) !== i);
  if (
    (temperament &&
      (!Array.isArray(temperament) ||
        findDuplicates(temperament).length !== 0)) ||
    (image && typeof image !== 'string') ||
    (life_span !== undefined &&
      (typeof life_span !== 'number' || life_span <= 0))
  ) {
    return res
      .status(400)
      .send('Please send the optional information with valid input types');
  }

  try {
    req.body.name = req.body.name.trim();
    const dog = await createDog(req.body);
    res.status(201).send(`Puppy ${dog} created`);
  } catch (error) {
    next(error);
  }
};
