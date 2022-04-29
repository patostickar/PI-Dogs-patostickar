/*
 [ ] GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados

Ruta de detalle de raza de perro: debe contener

[ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre, temperamento, peso)
[ ] Altura
[ ] Peso
[ ] Años de vida
 */

const { getDogById } = require('../services/getDogById');

module.exports.getDogDetail = async (req, res, next) => {
  const { idRaza } = req.params;
  try {
    const dog = await getDogById(idRaza);
    if (!dog) return res.send('No puppies found with that id ☹️');
    res.send(dog);
  } catch (error) {
    next(error);
  }
};
