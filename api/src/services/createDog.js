const { Dog, Temperament } = require("../db");

module.exports.createDog = async (data) => {
  const { temperament } = data;

  if (temperament) {
    if (!Array.isArray(temperament)) {
      throw new Error("Temperament must be of type Array");
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
