module.exports.detailedDogData = (dog) => {
  return {
    id: dog.id,
    name: dog.name,
    weight: dog.weight?.metric?.split(" - ").map((n) => +n) || dog.weight,
    height: dog.height?.metric?.split(" - ").map((n) => +n) || dog.height,
    life_span: dog.life_span,
    temperament:
      dog?.temperament?.split(", ") ||
      dog.dataValues?.Temperaments.map((t) => t.dataValues.name) ||
      [],
    image: dog?.reference_image_id || dog?.image,
  };
};
