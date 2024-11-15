import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/adoptions");
const userRequest = supertest("http://localhost:8080/api/users");
const petRequest = supertest("http://localhost:8080/api/pets");

describe("Test de integración Adoptions", () => {
  let testUser;
  let testPet;
  let testAdoption;

  before(async () => {
    // Crear usuario de prueba
    const userResponse = await userRequest.post("/").send({
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
      password: "password123",
    });
    testUser = userResponse.body.payload;
    console.log("Created User:", testUser);

    // Crear mascota de prueba
    const petResponse = await petRequest.post("/").send({
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
    if (status !== 200) {
      console.error("Error creating adoption:", body);
    }
    testAdoption = body.payload;
    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an("object");
    expect(body.payload.owner).to.be.equal(testUser._id);
    expect(body.payload.pet).to.be.equal(testPet._id);
  });

  it("[GET] /api/adoptions/:aid - Debe devolver una adopción por su id", async () => {
    if (!testAdoption || !testAdoption._id) {
      throw new Error("testAdoption is not defined or has no _id");
    }
    const { status, body } = await request.get(`/${testAdoption._id}`);
    expect(status).to.be.equal(200);
    expect(body.payload).to.be.an("object");
    expect(body.payload._id).to.be.equal(testAdoption._id);
  });

  after(async () => {
    // Limpiar los datos de prueba
    await userRequest.delete(`/${testUser._id}`);
    await petRequest.delete(`/${testPet._id}`);
  });
});
