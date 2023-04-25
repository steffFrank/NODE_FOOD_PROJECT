import request from "supertest";
import { app } from "../../app.js";
import { mongoConnect } from "../../utils/mongo.utils.js";
import { mongoDisconnect } from "../../utils/mongo.utils.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("Test Products API", () => {
    const endpoint = "/v1/products";

    beforeAll(async () => {
        await mongoConnect("test");
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    describe("Test POST product", () => {
        test("it should respond with status 400 if a property is emtpy", async () => {
            const response = await request(app)
                .post(endpoint)
                .field("name", "")
                .field("quantiry", 1)
                .attach("imageUrl", "")
                .expect("Content-Type", /json/)
                .expect(400)

            expect(response.body).toMatchObject({
                error: "Missing required property"
            })
        });

        test("it should respond with status 400 if the quantity is not valid", async () => {
            const response = await request(app)
                .post(endpoint)
                .field("name", "pineapple")
                .field("quantity", 14)
                .attach("imageUrl", __dirname + "/tests_doc/fixtures/banana_test.png")
                .expect("Content-Type", /json/)
                .expect(400)

            expect(response.body).toMatchObject({ error: "Product quantity not available" });
        });

        test("it should respond with status 201 if a product is added", async () => {

            const response = await request(app)
                .post(endpoint)
                .field("name", "productTest")
                .field("quantity", 1)
                .attach("imageUrl", __dirname + "/tests_doc/fixtures/banana_test.png")
                .expect(201)

            expect(response.body).toMatchObject({
                message: "Product added successfully"
            });
        });

        test("it should respond with 200 if a product is updated", async () => {

            const response = await request(app)
                .put(`${endpoint}/productTest`)
                .field("name", "newProductTest")
                .field("quantity", 3)
                .attach("imageUrl", __dirname + "/tests_doc/fixtures/banana_test.png")
                .expect(200)

            expect(response.body).toMatchObject({
                message: "Product modified successfully"
            });
        });

        test("it should respond with 200 if a product is deleted", async () => {

            const response = await request(app)
                .delete(`${endpoint}/newProductTest`)
                .expect(200)

            expect(response.body).toMatchObject({
                message: "Product deleted with success"
            });
        });

        test("it should respond with 404 if a product is not found", async () => {
            const response = await request(app)
                .delete(`${endpoint}/inexistingProduct`)
                .expect(404)

            expect(response.body).toMatchObject({
                message: "Product not found"
            });
        });
    })
})