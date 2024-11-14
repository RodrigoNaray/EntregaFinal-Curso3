import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/adoptions");

describe("Test de integración Adoptions", () => {
  let testAdoption;
  let testUser;
  let testPet;

  before(async () => {
    // Crear un usuario y una mascota para las pruebas
    const userResponse = await supertest("http://localhost:8080/api/users").post("/").send({
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
      password: "123456",
    });
    testUser = userResponse.body.payload;
    console.log("Created User:", testUser);

    const petResponse = await supertest("http://localhost:8080/api/pets").post("/").send({
      name: "Test Pet",
      specie: "Gato",
      birthDate: "2023-10-10",
    });
    testPet = petResponse.body.payload;
    console.log("Created Pet:", testPet);
  });

  it("[GET] /api/adoptions - Debe devolver un array de adopciones", async () => {
    const { status, body } = await request.get("/");
    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an("array");
  });

  it("[POST] /api/adoptions/:uid/:pid - Debe crear una nueva adopción", async () => {
    console.log("User ID:", testUser._id);
    console.log("Pet ID:", testPet._id);
    const { status, body } = await request.post(`/${testUser._id}/${testPet._id}`);
    testAdoption = body.payload;
    expect(status).to.be.equal(201);
    expect(body.payload).to.be.an("object");
    expect(body.payload.owner).to.be.equal(testUser._id);
    expect(body.payload.pet).to.be.equal(testPet._id);
  });

  it("[GET] /api/adoptions/:aid - Debe devolver una adopción por su id", async () => {
    const { status, body } = await request.get(`/${testAdoption._id}`);
    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an("object");
    expect(body.payload._id).to.be.equal(testAdoption._id);
  });

  after(async () => {
    // Limpiar los datos de prueba
    await supertest("http://localhost:8080/api/users").delete(`/${testUser._id}`);
    await supertest("http://localhost:8080/api/pets").delete(`/${testPet._id}`);
  });
});