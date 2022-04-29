module.exports.simpleDogData = (dogData) => {
  return dogData.map((dog) => {
    const [w_min, w_max] =
      dog.weight?.metric?.split(' - ').map((n) => +n) || dog.weight;

    return {
      id: dog.id,
      name: dog.name,
      weight: { min: w_min, max: w_max },
      temperament:
        dog?.temperament?.split(', ') ||
        dog.dataValues?.Temperaments.map((t) => t.dataValues.name) ||
        [],
      image: dog?.image?.url || dog?.image,
    };
  });
};
