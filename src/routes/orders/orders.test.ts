import request from "supertest";
import { app } from "../../app";
import { mongoConnect } from "../../utils/mongo.utils";
import { mongoDisconnect } from "../../utils/mongo.utils";
import Order from "../../models/orders/orders.schema";

describe("Test Products API", () => {
    const endpoint = "/v1/orders";

    beforeAll(async () => {
        await mongoConnect("test");

        await Order.deleteMany({});
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    describe("Test order", () => {
        test("it should respond with status 400 if a property is emtpy", async () => {
            const response = await request(app)
                .post(endpoint)
                .send({
                    products: [],
                    users: ["user1_test@gmail.com"]
                })
                .expect("Content-Type", /json/)
                .expect(400)

            expect(response.body).toMatchObject({
                error: "Missing required property"
            });
        });

        test("it should respond with status 404 if a product or user is not found", async () => {

            const response = await request(app)
                .post(endpoint)
                .send({
                    products: ["notFoundProduct"],
                    users: ["user1_test@gmail.com"]
                })
                .expect(404)

            expect(response.body).toMatchObject({
                error: "Values not found. A product or User in your lists doesn't exist"
            });
        });

        test("it should respond with status 400 if there are duplicates values in the arrays", async () => {

            const response = await request(app)
                .post(endpoint)
                .send({
                    products: ["cheakpea", "cheakpea"],
                    users: ["user1_test@gmail.com"]
                })
                .expect(400)

            expect(response.body).toMatchObject({
                error: "Duplicate values are not allowed"
            });
        });

        test("it should respond with status 201 if an order is added", async () => {

            const response = await request(app)
                .post(endpoint)
                .send({
                    products: ["banana"],
                    users: ["user1_test@gmail.com"]
                })
                .expect(201);

            expect(response.body.orderId).toBeDefined()

        });

        test("it should respond with status 200 if an order is updated", async () => {
            // Add a new order
            const postResponse = await request(app)
                .post(endpoint)
                .send({
                    products: ["banana"],
                    users: ["user1_test@gmail.com"]
                });
            // Retrieve the orderId from the body
            const { orderId } = postResponse.body;

            // Modify the just created order
            const response = await request(app)
                .put(`${endpoint}/${orderId}`)
                .send({
                    products: ["banana", "cheakpea"],
                    users: ["user1_test@gmail.com", "user2_test@gmail.com"]
                })
                .expect(200);

            expect(response.body).toMatchObject({ message: "order modified successfully" })
        });

        test("it should respond with status 200 if an order is deleted", async () => {
            // Add a new order
            const postResponse = await request(app)
                .post(endpoint)
                .send({
                    products: ["banana", "cheakpea"],
                    users: ["user1_test@gmail.com", "user2_test@gmail.com"]
                });
            // Retrieve the orderId from the body
            const { orderId } = postResponse.body;

            // Delete the just created order
            const response = await request(app)
                .delete(`${endpoint}/${orderId}`)
                .expect(200);

            expect(response.body).toMatchObject({ message: "order deleted with success" });
        });

        test("it should respond with status 404 if an order doesn't exist", async () => {
            // Delete the just created order
            const response = await request(app)
                .delete(`${endpoint}/6447af5867a8f2bf965e10b8`)
                .expect(404);

            expect(response.body).toMatchObject({ error: "This order doesn't exist" });
        });

        test("it should respond with status 200 if all orders are returned", async () => {
            // Delete the just created order
            const response = await request(app)
                .get(endpoint)
                .expect(200);

            expect(response.body.result).toBeDefined();
        });
    })
})