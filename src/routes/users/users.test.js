import request from "supertest";
import { app } from "../../app.js";
import { mongoConnect } from "../../utils/mongo.utils.js";
import { mongoDisconnect } from "../../utils/mongo.utils.js";

describe("Test users API", () => {
    const endpoint = "/v1/users";
    beforeAll( async () => {
        await mongoConnect("test");
    });

    afterAll( async () => {
        await mongoDisconnect();
    });

    describe("Test POST /users", () => {
        test("it should respond with status 400 if a property is missing",  async () => {
           const response = await request(app)
            .post(endpoint)
            .send({
                firstname: "firstnameTest",
                lastname: "lastnameTest",
                email: ""
            })
            .expect("Content-Type", /json/)
            .expect(400);
    
            expect(response.body).toMatchObject({
                error: "Missing required property"
            })
        });
    
        test("it should respond with status 201 if a user is created",  async () => {
            const response = await request(app)
                .post(endpoint)
                .send({
                    "firstname": "firstnameTest",
                    "lastname": "lastnameTest",
                    "email": "emailTest2@gmail.com"
                })
                .expect("Content-Type", /json/)
                .expect(201)

                expect(response.body).toMatchObject({
                    message: "User registered successfully"
                })
         });

         test("it should respond with status 400 if a user already exists",  async () => {
            const response = await request(app)
                .post(endpoint)
                .send({
                    "firstname": "firstnameTest",
                    "lastname": "lastnameTest",
                    "email": "emailTest2@gmail.com"
                })
                .expect("Content-Type", /json/)
                .expect(400)

                expect(response.body).toMatchObject({
                    error: "emailTest2@gmail.com already exists"
                })
         });
    });

    describe("Test PUT /users", () => {
        test("it should respond with 200 if the update was successfull", async () => {
            const response = await request(app)
                .put(endpoint)
                .expect("Content-Type", /json/)
                .send({
                    "firstname": "firstnameTestUpdate",
                    "lastname": "lastnameTestUpdate",
                    "email": "emailTest2@gmail.com"    
                })
                .expect(200);

                expect(response.body).toMatchObject({
                    message: "User updated successfully"
                });
        });

        test("it should respond with 404 if the user doens't exist", async () => {
            const response = await request(app)
                .put(endpoint)
                .expect("Content-Type", /json/)
                .send({
                    "firstname": "firstnameTestUpdate",
                    "lastname": "lastnameTestUpdate",
                    "email": "emailTest9@gmail.com"    
                })
                .expect(404);

                expect(response.body).toMatchObject({
                    error: "emailTest9@gmail.com doesn't exist in the db"
                });
        });
    })
})