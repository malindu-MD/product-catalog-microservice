
# 🛒 Product Catalog Microservice

This microservice provides a RESTful API to manage product catalog data for an e-commerce platform. It supports product creation, listing, filtering, updating, deletion, category retrieval, and product reviews. Built using Node.js, Express.js, and MongoDB, it's containerized with Docker and deployable on cloud platforms like AWS ECS/Fargate.

---

## 📦 Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Containerization:** Docker + Docker Compose
- **DevOps:** GitHub Actions (CI/CD)
- **Deployment:** AWS ECS/Fargate
- **Security:** Helmet, CORS, Input validation

---

## 📁 Project Structure

```
├── controllers/               # Route logic and business logic
├── models/                   # Mongoose schema definitions
├── routes/                   # API route definitions
├── middleware/               # Middleware (e.g., error handlers, validators)
├── .env.example              # Example environment config
├── Dockerfile                # Docker image config
├── docker-compose.yml        # Compose config for local development
├── .github/workflows/        # GitHub Actions CI/CD workflow
├── server.js                 # Entry point of the application
└── README.md                 # Documentation
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/product-catalog-microservice.git
cd product-catalog-microservice
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example file and fill in your MongoDB connection string:

```bash
cp .env.example .env
```

Example `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/productcatalog
```

### 4. Run the Application

```bash
npm run dev
```

Visit the API at: `http://localhost:5000`

---

## 🧪 Postman API Testing

A Postman collection is included under `/docs/ProductCatalog.postman_collection.json`.

### Sample Endpoints

| Method | Endpoint                          | Description                         |
|--------|-----------------------------------|-------------------------------------|
| GET    | `/products`                       | List products with filters          |
| GET    | `/products/:id`                   | Get product by ID                   |
| POST   | `/products`                       | Create a new product                |
| PUT    | `/products/:id`                   | Update an existing product          |
| DELETE | `/products/:id`                   | Delete a product                    |
| GET    | `/categories`                     | Get list of product categories      |
| GET    | `/products/reviews/:id`           | Get reviews for a product           |
| POST   | `/products/reviews/:id`           | Submit a review for a product       |

---

## 📤 Example Request Bodies

### Create a Product

```json
POST /products
Content-Type: application/json

{
  "name": "Smartphone X",
  "price": 599.99,
  "category": "Electronics",
  "availability": "in_stock",
  "description": "Latest smartphone with all features.",
  "images": ["https://example.com/image1.jpg"]
}
```

### Submit a Review

```json
POST /products/reviews/123
Content-Type: application/json

{
  "user": "john_doe",
  "rating": 5,
  "comment": "Excellent product!"
}
```

---

## 🐳 Docker Setup

### Build Docker Image

```bash
docker build -t product-catalog-service .
```

### Run with Docker Compose

```bash
docker-compose up
```

### Docker Compose includes:

- Node.js app
- MongoDB service
- Environment variables configuration

---

## ⚙️ CI/CD with GitHub Actions

The workflow performs:

- Linting and tests
- Docker image build
- Push to DockerHub
- Deploy to AWS ECS/Fargate (optional)

See `.github/workflows/deploy.yml` for configuration.

---

## 🛡️ Security & Best Practices

- Input validation using `express-validator`
- Secure HTTP headers via `helmet`
- CORS policy using `cors` package
- Avoid secrets in code; use `.env` and secret managers
- Only expose public API responses

---

## ✅ Code Quality

- Consistent code style (Airbnb base)
- ESLint and Prettier configured
- Commented functions and clear structure
- Modular routes, models, and controllers

---

## 📂 Environment Variables

| Variable        | Description                        |
|----------------|------------------------------------|
| `PORT`          | Port number to run the server      |
| `MONGODB_URI`   | MongoDB connection string          |

---

## 🧼 Linting & Formatting

Run lint:

```bash
npm run lint
```

Format code:

```bash
npm run format
```

---

## ☁️ Deployment (Example: AWS ECS/Fargate)

- Container pushed from CI pipeline
- AWS ECS service pulls updated container
- Load balancer or API Gateway exposes endpoint

---

## 📄 License

MIT License

---

## 🤝 Contributors

- [Your Name](https://github.com/yourusername)

---

## 🧠 Future Improvements

- Authentication & authorization (JWT + roles)
- Rate limiting & API key control
- Full test coverage (unit + integration)
- Centralized logging (Winston/Morgan)

---
