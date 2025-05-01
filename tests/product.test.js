const request = require("supertest");
const mongoose = require("mongoose");
const Product = require("../models/product");
const app = require("../index");

// Connect to your test DB (replace if needed)
beforeAll(async () => {
  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/product-catalog-test";
  await mongoose.connect(MONGO_URI);
});

afterEach(async () => {
  await Product.deleteMany(); // Clean between tests
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Product API", () => {
  it("GET /api/products - should return empty array", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.products).toEqual([]);
  });

  it("POST /api/products - should create a product", async () => {
    const res = await request(app).post("/api/products").send({
      name: "Test Product",
      price: 100,
      category: "Electronics",
      description: "Example product",
      images: ["http://img.url"]
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("product_id");
  });

  it("GET /api/products/:id - should return one product", async () => {
    const product = await Product.create({
      name: "Keyboard",
      price: 49.99,
      category: "Accessories",
      description: "Mechanical keyboard",
      images: []
    });

    const res = await request(app).get(`/api/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Keyboard");
  });

  it("PUT /api/products/:id - should update product", async () => {
    const product = await Product.create({
      name: "Mouse",
      price: 25,
      category: "Accessories",
      description: "Optical mouse",
      images: []
    });

    const res = await request(app).put(`/api/products/${product._id}`).send({
      price: 30,
      availability: "pre_order",
      description: "Updated mouse"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Product updated successfully");
  });

  it("DELETE /api/products/:id - should delete product", async () => {
    const product = await Product.create({
      name: "Monitor",
      price: 150,
      category: "Displays",
      description: "24-inch monitor",
      images: []
    });

    const res = await request(app).delete(`/api/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Product deleted successfully");
  });
});
