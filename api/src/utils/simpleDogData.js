module.exports.simpleDogData = (dogData) => {
  return dogData.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      weight: dog.weight?.metric || dog.weight,
      temperament:
        dog?.temperament ||
        dog.dataValues?.Temperaments.map((t) => t.dataValues.name).join(", "),
      image: dog?.reference_image_id || dog?.image,
    };
  });
};
