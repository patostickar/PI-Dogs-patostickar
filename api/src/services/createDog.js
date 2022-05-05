const { Dog, Temperament } = require('../db');

module.exports.createDog = async (data) => {
  const { temperament } = data;
  if (!data.image)
    data.image =
      'https://media.ambito.com/p/ab2a83915e3c3e9fdc127a9f5cae866e/adjuntos/239/imagenes/038/976/0038976244/1200x1200/smart/dogejpg.jpg';

  if (temperament) {
    if (!Array.isArray(temperament)) {
      throw new Error('Temperament must be of type Array');
    } else {
      const dog = await Dog.create(data);
      const temperamentsIds = [];

      // map no es async
      for (const t of temperament) {
        const [temp] = await Temperament.findOrCreate({
          where: { name: t.trim() },
        });
        temperamentsIds.push(temp.dataValues.id);
      }

      // setTemperaments replaces the previous ones, an empty array erases everything
      await dog.addTemperaments(temperamentsIds);
      return dog.dataValues.name;
    }
  } else {
    const dog = await Dog.create(data);
    return dog.dataValues.name;
  }
};
