const mainApp = require("../router");
const request = require("supertest");
const { X_API_KEY } = require("../configs/config");

// LOGIN
describe("POST /api/v1/auth/login", () => {
  it("returns status code 200 if success login", async () => {
    const res = await request(mainApp)
      .post("/api/v1/auth/login")
      .set("Accept", "application/json")
      .set("x-api-key", X_API_KEY)
      .send({ username: "adi1", password: "sanjaya" });

    // toEqual recursively checks every field of an object or array.
    expect(res.statusCode).toEqual(200);
  });
});

// REGISTER
describe("POST /api/v1/auth/register", () => {
  it("returns status code 200 if success register", async () => {
    const res = await request(mainApp)
      .post("/api/v1/auth/register")
      .set("Accept", "application/json")
      .set("x-api-key", X_API_KEY)
      .send({
        username: "aditest3",
        password: "sanjaya",
        name: "adi",
        email: "sanjaya@gmail.com",
      });

    // toEqual recursively checks every field of an object or array.
    expect(res.statusCode).toEqual(200);
  });
});
