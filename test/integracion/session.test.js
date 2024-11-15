import { expect } from "chai";
import supertest from "supertest";
import envs from "../../src/config/envs.config.js";

const PORT = envs.PORT || 8080;

const request = supertest(`http://localhost:${PORT}/api/sessions`);
const userRequest = supertest(`http://localhost:${PORT}/api/users`);

describe("Test Integrales de Sessions", () => {
  let userTest;
  it("[POST] /api/sessions/register - Debe registrar un usuario", async () => {
    const newUser = {
      first_name: "User",
      last_name: "Test",
      email: "usertest1@gmail.com",
      password: "123",
    };

    const { status, body } = await request.post("/register").send(newUser);
    userTest = body.payload;

    expect(status).to.be.equal(200);
    expect(body.status).to.be.equal("success");
    expect(body.payload).to.be.an("object");
    expect(body.payload.email).to.be.equal(newUser.email);
    expect(body.payload.first_name).to.be.equal(newUser.first_name);
    expect(body.payload.last_name).to.be.equal(newUser.last_name);
    expect(body.payload.password).to.not.be.equal(newUser.password);
  });

  it("[POST] /api/sessions/login - Debe loguear un usuario", async () => {
    const data = {
      email: "usertest1@gmail.com",
      password: "123",
    };

    const { status, body } = await request.post("/login").send(data);
    
    expect(status).to.be.equal(200);
    expect(body.status).to.be.equal("success");
    expect(body.message).to.be.an("string");
  });



  after(async () => {
    await userRequest.delete(`/${userTest._id}`)
  });
});
