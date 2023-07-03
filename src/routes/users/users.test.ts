import request from "supertest";
import { app } from "../../app";
import { mongoConnect } from "../../utils/mongo.utils";
import { mongoDisconnect } from "../../utils/mongo.utils";
import User from "../../models/users/users.schema";

describe("Test users API", () => {
  const endpoint = "/v1/users";
  beforeAll(async () => {
    await mongoConnect("test");
    
    // Delete all the data
    await User.deleteMany({});
    
    // Add some default users
    const user1 = new User({firstname: "firstname1", lastname: "lastname1", email: "user1_test@gmail.com"});

    const user2 = new User({firstname: "firstname2", lastname: "lastname2", email: "user2_test@gmail.com"});

    await user1.save();
    await user2.save();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test POST /users", () => {
    test("it should respond with status 400 if a property is missing", async () => {
      const response = await request(app)
        .post(endpoint)
        .send({
          firstname: "firstnameTest",
          lastname: "lastnameTest",
          email: "",
        })
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toMatchObject({
        error: "Missing required property",
      });
    });

    test("it should respond with status 201 if a user is created", async () => {
      const response = await request(app)
        .post(endpoint)
        .send({
          firstname: "firstnameTest",
          lastname: "lastnameTest",
          email: "emailTest1@gmail.com",
        })
        .expect("Content-Type", /json/)
        .expect(201);

      expect(response.body).toMatchObject({
        message: "User registered successfully",
      });
    });

    test("it should respond with status 400 if a user already exists", async () => {
      const response = await request(app)
        .post(endpoint)
        .send({
          firstname: "firstnameTest",
          lastname: "lastnameTest",
          email: "emailTest1@gmail.com",
        })
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toMatchObject({
        error: "emailTest1@gmail.com already exists",
      });
    });
  });

  describe("Test PUT /users", () => {
    test("it should respond with 200 if the update was successfull", async () => {
      const response = await request(app)
        .put(endpoint)
        .expect("Content-Type", /json/)
        .send({
          firstname: "firstnameTestUpdate",
          lastname: "lastnameTestUpdate",
          email: "emailTest1@gmail.com",
        })
        .expect(200);

      expect(response.body).toMatchObject({
        message: "User updated successfully",
      });
    });

    test("it should respond with 404 if the user doens't exist", async () => {
      const response = await request(app)
        .put(endpoint)
        .expect("Content-Type", /json/)
        .send({
          firstname: "firstnameTestUpdate",
          lastname: "lastnameTestUpdate",
          email: "emailTest9@gmail.com",
        })
        .expect(404);

      expect(response.body).toMatchObject({
        error: "emailTest9@gmail.com doesn't exist in the db",
      });
    });
  });

  describe("Test DELETE /users ", () => {
    test("it should respond with 200 if the user is deleted", async () => {
      const response = await request(app)
        .delete(endpoint)
        .expect("Content-Type", /json/)
        .send({
          email: "emailTest1@gmail.com",
        })
        .expect(200);

      expect(response.body).toMatchObject({
        message: "User deleted successfully",
      });
    });

    test("it should respond with 404 if the user doesn't exist", async () => {
      const response = await request(app)
        .delete(endpoint)
        .expect("Content-Type", /json/)
        .send({
          email: "emailTest9@gmail.com",
        })
        .expect(404);

      expect(response.body).toMatchObject({
        error: "emailTest9@gmail.com doesn't exist in the db",
      });
    });
  });
});
