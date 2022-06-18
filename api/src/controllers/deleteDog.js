const { Dog } = require('../db');

module.exports.deleteDog = async (req, res, next) => {
  const { idRaza } = req.params;
  console.log('hola');
  try {
    await Dog.destroy({ where: { id: idRaza } });
    res.send(`Dog ${idRaza} deleted`);
  } catch (error) {
    next(error);
  }
};
