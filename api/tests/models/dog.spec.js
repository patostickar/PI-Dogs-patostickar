/* eslint-disable */
const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Create new Dog', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  let dog;
  beforeEach(() => conn.sync({ force: true }));
  describe('Mandatory fields', () => {
    beforeEach(
      () =>
        (dog = {
          name: 'Perrito Malvado',
          weight_min: 1,
          weight_max: 10,
          height_min: 2,
          height_max: 20,
        })
    );
    it('should throw an error when all are null', async () => {
      try {
        await Dog.create({});
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it('should throw an error when name is null', async () => {
      dog.name = null;
      try {
        await Dog.create(dog);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it('should throw an error when name type is invalid', async () => {
      dog.name = 123;
      try {
        await Dog.create(dog);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it('should throw an error when weight_min is null', async () => {
      dog.weight_min = null;
      try {
        await Dog.create(dog);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it('should throw an error when weight_min type is invalid', async () => {
      dog.weight_min = 'text';
      try {
        await Dog.create(dog);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it('should throw an error when weight_max is null', async () => {
      dog.weight_max = null;
      try {
        await Dog.create(dog);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it('should throw an error when weight_max type is invalid', async () => {
      dog.weight_max = 'text';
      try {
        await Dog.create(dog);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it('should throw an error when height_min is null', async () => {
      dog.height_min = null;
      try {
        await Dog.create(dog);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it('should throw an error when height_min type is invalid', async () => {
      dog.height_min = 'text';
      try {
        await Dog.create(dog);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it('should throw an error when height_max is null', async () => {
      dog.height_max = null;
      try {
        await Dog.create(dog);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it('should throw an error when height_max type is invalid', async () => {
      dog.height_max = 'text';
      try {
        await Dog.create(dog);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it('Should create new Dog when all mandatory fields are complete', async () => {
      const newdog = await Dog.create(dog);
      expect(newdog.toJSON()).contain({
        name: 'Perrito Malvado',
        weight_min: 1,
        weight_max: 10,
        height_min: 2,
        height_max: 20,
      });
    });
  });
  describe('Optional fields', () => {
    beforeEach(
      () =>
        (dog = {
          name: 'Perrito Malvado',
          weight_min: 1,
          weight_max: 10,
          height_min: 2,
          height_max: 20,
          temperament: ['caravanero', 'pendenciero', 'Energetic'],
          image: 'imageURL',
          life_span: 15,
        })
    );
    it('should throw an error when temperament type is not an array', async () => {
      dog.temperamnet = 'not an array';
      try {
        await Dog.create(dog);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it("should throw an error when temperament array doesn't contain strings", async () => {
      dog.temperamnet = [1, 2, 3];
      try {
        await Dog.create(dog);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it('should throw an error when image type is invalid', async () => {
      dog.image = 123;
      try {
        await Dog.create(dog);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it('should throw an error when life_span type is invalid', async () => {
      dog.life_span = 'text';
      try {
        await Dog.create(dog);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it('Should create new Dog when all optional fields are complete', async () => {
      const newdog = await Dog.create(dog);
      // No sé cómo sincronizar la DB con los test
      // const fullDog = await Dog.findByPk(newdog.id, { include: Temperament });
      expect(newdog.toJSON()).contain({
        name: 'Perrito Malvado',
        weight_min: 1,
        weight_max: 10,
        height_min: 2,
        height_max: 20,
        image: 'imageURL',
        life_span: '15 years',
      });
    });
  });
});
