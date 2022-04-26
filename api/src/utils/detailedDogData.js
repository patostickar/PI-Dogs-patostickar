module.exports.detailedDogData = (dog) => {
  return {
    id: dog.id,
    name: dog.name,
    weight: dog.weight?.metric || dog.weight,
    height: dog.height?.metric || dog.height,
    life_span: dog.life_span,
    temperament:
      dog?.temperament ||
      dog.dataValues?.Temperaments.map((t) => t.dataValues.name).join(", "),
    image: dog?.reference_image_id || dog?.image,
  };
};
