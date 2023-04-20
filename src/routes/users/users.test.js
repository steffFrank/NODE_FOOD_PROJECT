import request from "supertest";
import { app } from "../../app.js";
import { mongoConnect } from "../../utils/mongo.utils.js";
import { mongoDisconnect } from "../../utils/mongo.utils.js";

describe("Test users API", () => {

    beforeAll( async () => {
        await mongoConnect("test");
    });

    afterAll( async () => {
        await mongoDisconnect();
    });

    describe("Test POST /auth", () => {
        test("it should respond with status 400 if a property is missing",  async () => {
           const response = await request(app)
            .post("/v1/auth")
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
                .post("/v1/auth")
                .send({
                    "firstname": "firstnameTest",
                    "lastname": "lastnameTest",
                    "email": "emailTest1@gmail.com"
                })
                .expect("Content-Type", /json/)
                .expect(201)

                expect(response.body).toMatchObject({
                    message: "User registered successfully"
                })
         });

         test("it should respond with status 400 if a user already exists",  async () => {
            const response = await request(app)
                .post("/v1/auth")
                .send({
                    "firstname": "firstnameTest",
                    "lastname": "lastnameTest",
                    "email": "emailTest1@gmail.com"
                })
                .expect("Content-Type", /json/)
                .expect(400)

                expect(response.body).toMatchObject({
                    error: "emailTest1@gmail.com already exists"
                })
         });
    });

    describe("PUT /auth")

})