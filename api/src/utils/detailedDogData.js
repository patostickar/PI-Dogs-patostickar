module.exports.detailedDogData = (dog) => {
  if (dog) {
    const [w_min, w_max] =
      dog.weight?.metric?.split(' - ').map((n) => +n) || dog.weight;

    const [h_min, h_max] =
      dog.height?.metric?.split(' - ').map((n) => +n) || dog.height;

    return {
      id: dog.id,
      name: dog.name,
      weight: { min: w_min, max: w_max },
      height: { min: h_min, max: h_max },
      life_span: dog.life_span,
      temperament:
        dog?.temperament?.split(', ') ||
        dog.dataValues?.Temperaments.map((t) => t.dataValues.name) ||
        [],
      image: dog?.image?.url || dog?.image,
    };
  }
};
