module.exports.simpleDogData = (dogData) => {
  return dogData.map((dog) => {
    const [min, max] =
      dog.weight?.metric?.split(" - ").map((n) => +n) || dog.weight;

    return {
      id: dog.id,
      name: dog.name,
      weight: { min, max },
      temperament:
        dog?.temperament?.split(", ") ||
        dog.dataValues?.Temperaments.map((t) => t.dataValues.name) ||
        [],
      image: dog?.image?.url || dog?.image,
    };
  });
};
