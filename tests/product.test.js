const request = require("supertest");
const mongoose = require("mongoose");
const Product = require("../models/product");
const app = require("../index");

beforeAll(async () => {
  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/product-catalog-test";
  await mongoose.connect(MONGO_URI);
});

afterEach(async () => {
  await Product.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
});


describe("Error Handling Middleware", () => {
    it("should return a standardized error when invalid ObjectId is used", async () => {
      const res = await request(app).get("/api/products/invalid-id");
  
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("message");
      expect(typeof res.body.message).toBe("string");
  
      if (process.env.NODE_ENV !== "production") {
        expect(res.body).toHaveProperty("stack");
        expect(typeof res.body.stack).toBe("string");
      } else {
        expect(res.body.stack).toBeNull();
      }
    });
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
      description: "Test description",
      images: ["http://img.url"]
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("product_id");
  });

  it("GET /api/products/:id - should return a product", async () => {
    const product = await Product.create({
      name: "Item",
      price: 50,
      category: "Books",
      description: "A book",
      images: []
    });
    const res = await request(app).get(`/api/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Item");
  });

  it("GET /api/products/:id - should return 404 for non-existent product", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/products/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Product not found");
  });

  it("GET /api/products/:id - should return 500 for invalid ID", async () => {
    const res = await request(app).get("/api/products/invalid-id");
    expect(res.statusCode).toBe(500);
  });

  it("PUT /api/products/:id - should update a product", async () => {
    const product = await Product.create({
      name: "Mouse",
      price: 30,
      category: "Accessories",
      description: "Old mouse",
      images: []
    });
    const res = await request(app).put(`/api/products/${product._id}`).send({
      price: 35,
      availability: "pre_order",
      description: "Updated mouse"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Product updated successfully");
  });

  it("PUT /api/products/:id - should return 404 if product not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).put(`/api/products/${fakeId}`).send({
      price: 99,
      description: "Missing",
      availability: "out_of_stock"
    });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Product not found");
  });

  it("DELETE /api/products/:id - should delete a product", async () => {
    const product = await Product.create({
      name: "Monitor",
      price: 200,
      category: "Displays",
      description: "24-inch monitor",
      images: []
    });
    const res = await request(app).delete(`/api/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Product deleted successfully");
  });

  it("DELETE /api/products/:id - should return 404 if product not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/products/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Product not found");
  });

  it("GET /api/products with filters - should return filtered results", async () => {
    await Product.create([
      { name: "Book A", price: 100, category: "Books", description: "One", images: [] },
      { name: "Book B", price: 200, category: "Books", description: "Two", images: [] },
      { name: "Phone", price: 500, category: "Electronics", description: "Smart", images: [] }
    ]);

    const res = await request(app).get("/api/products?category=Books&price_max=150");
    expect(res.statusCode).toBe(200);
    expect(res.body.products.length).toBe(1);
    expect(res.body.products[0].name).toBe("Book A");
  });
});
