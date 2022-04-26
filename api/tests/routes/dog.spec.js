/* eslint-disable */
// Cant test for
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, Temperament, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  name: "Perrito Malvado",
  weight_min: 1,
  weight_max: 10,
  height_min: 2,
  height_max: 20,
};

describe("Routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    conn.sync({ force: true }).then(async () => {
      await Dog.bulkCreate([
        {
          name: "Scooby",
          weight_min: 1,
          weight_max: 10,
          height_min: 2,
          height_max: 20,
        },
        {
          name: "Beethoven",
          weight_min: 3,
          weight_max: 30,
          height_min: 4,
          height_max: 40,
        },
        {
          name: "Mozart",
          weight_min: 5,
          weight_max: 50,
          height_min: 6,
          height_max: 60,
        },
        {
          name: "Ringo",
          weight_min: 7,
          weight_max: 70,
          height_min: 8,
          height_max: 80,
        },
      ]);
      await Temperament.bulkCreate([
        { name: "Steady" },
        { name: "Fearless" },
        { name: "Friendly" },
        { name: "Devoted" },
        { name: "Assertive" },
        { name: "Spirited" },
        { name: "Energetic" },
      ]);
    })
  );
  describe("Dog", () => {
    describe("GET /dogs", () => {
      it("should get status 200 and a list of dogs", async () => {
        const res = await agent.get("/dogs");
        expect(res.statusCode).to.be.equal(200) &&
          expect(res.body.length).to.be.equal(
            176
          ); /* 174 from API + 4 Created */
      });
    });
    describe("POST /dog", () => {
      const dog = {
        name: "Scoot",
        weight_min: 9,
        weight_max: 90,
        height_min: 10,
        height_max: 100,
      };
      it("should return 201 and a created message", async () => {
        const res = await agent.post("/dog").send(dog);

        expect(res.statusCode).to.be.equal(201) &&
          expect(res.text).to.be.contain("created");
      });
    });
  });
  describe("Temperament", () => {
    describe("GET /temperament", () => {
      it("should get 200", async () => {
        const res = await agent.get("/temperament");
        expect(res.statusCode).to.be.equal(200) &&
          expect(res.body.length).to.be.equal(7);
      });
    });
  });
});
