# 🍔 FoodApp Backend

Backend service for the **FoodApp Full Stack Food Ordering Platform**.

Built using **Spring Boot (Java 21)** with **Spring Security + JWT Authentication**, MySQL database, Email OTP verification, and Cloudinary image upload.

---

# 🚀 Tech Stack

- Java 21
- Spring Boot
- Spring Security
- JWT (jjwt 0.11.5)
- Spring Data JPA
- MySQL
- Spring Mail (Gmail SMTP)
- Cloudinary (Image Upload)
- Maven
- BCrypt Password Encoding

---

# 🏗 Architecture

Client (React Frontend)  
⬇  
Spring Boot REST API  
⬇  
Service Layer (Business Logic)  
⬇  
Repository Layer (JPA)  
⬇  
MySQL Database  

External Integrations:
- 📧 Gmail SMTP → Email OTP verification
- ☁️ Cloudinary → Image storage

---

# 📁 Project Structure

```
backend/
│
├── src/main/java/com/karan/
│   ├── config/          # Security, CORS, Cloudinary config
│   ├── controller/      # REST Controllers
│   ├── dto/             # Request & Response DTOs
│   ├── enums/           # UserRole, VerificationType
│   ├── mapper/          # Entity ↔ DTO Mapping
│   ├── model/           # JPA Entities
│   ├── repository/      # JPA Repositories
│   ├── security/        # JWT Filter & Utilities
│   └── service/         # Business Logic Layer
│
├── src/main/resources/
│   └── application.properties
│
├── pom.xml
├── Dockerfile
└── README.md
```

---

# 🔐 Security & Authentication

- JWT-based stateless authentication
- Role-based authorization (USER / ADMIN)
- BCrypt password hashing
- Email OTP verification for:
  - Account activation
  - Password reset
- Spring Security filter chain
- Protected endpoints using `@PreAuthorize`

---

# 👤 User Authentication APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & receive JWT |
| POST | `/api/auth/verify-email` | Verify OTP |
| POST | `/api/auth/forgot-password` | Send reset OTP |
| POST | `/api/auth/reset-password` | Reset password |
| POST | `/api/auth/resend-otp` | Resend OTP |
| GET | `/api/auth/me` | Get profile |
| PUT | `/api/auth/update-profile` | Update profile |
| POST | `/api/auth/change-password` | Change password |

---

# 🍽 Food APIs

| Method | Endpoint | Role |
|--------|----------|------|
| GET | `/api/foods` | Public |
| GET | `/api/foods/{id}` | Public |
| GET | `/api/foods/restaurant/{id}` | Public |
| POST | `/api/foods/restaurant/{id}` | ADMIN |
| PUT | `/api/foods/{id}` | ADMIN |
| PUT | `/api/foods/{id}/with-image` | ADMIN |
| DELETE | `/api/foods/{id}` | ADMIN |

---

# 🏢 Restaurant APIs

| Method | Endpoint | Role |
|--------|----------|------|
| GET | `/api/restaurants` | Public |
| GET | `/api/restaurants/{id}` | Public |
| POST | `/api/restaurants` | ADMIN |
| PUT | `/api/restaurants/{id}` | ADMIN |
| DELETE | `/api/restaurants/{id}` | ADMIN |

---

# 🛒 Cart APIs (USER Only)

| Method | Endpoint |
|--------|----------|
| POST | `/api/cart/add/{foodId}` |
| GET | `/api/cart` |
| PUT | `/api/cart/update/{cartItemId}` |
| DELETE | `/api/cart/remove/{cartItemId}` |
| DELETE | `/api/cart/clear` |

---

# 📦 Order APIs

| Method | Endpoint | Role |
|--------|----------|------|
| POST | `/api/orders/place` | USER |
| GET | `/api/orders` | USER / ADMIN |
| GET | `/api/orders/{id}` | USER / ADMIN |
| PATCH | `/api/orders/{id}/status` | ADMIN |
| DELETE | `/api/orders/{id}` | USER |

---

# 🔄 Order Workflow

### USER Flow
Cart → Place Order → Order Created (PENDING)

### ADMIN Flow
PENDING → CONFIRMED → OUT_FOR_DELIVERY → DELIVERED  
or  
PENDING → CANCELLED

---

# ⚙️ Environment Variables

Configure in `application.properties` or system environment:

```
DB_URL=jdbc:mysql://localhost:3306/foodapp
DB_USER=root
DB_PASSWORD=your_password

SERVER_PORT=10000

JWT_SECRET=your_secret_key
JWT_EXPIRATION=86400000

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_app_password

CLOUDINARY_CLOUDNAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

# ▶️ Running the Backend

## 1️⃣ Navigate to backend folder

```
cd backend
```

## 2️⃣ Install dependencies & Run

```
mvn spring-boot:run
```

Or using Maven Wrapper:

```
./mvnw spring-boot:run
```

Backend runs on:

```
http://localhost:10000
```

---

# 🐳 Docker Support

Build Docker Image:

```
docker build -t foodapp-backend .
```

Run Container:

```
docker run -p 10000:10000 foodapp-backend
```

---

# 📌 Current Implementation Status

✔ JWT Authentication  
✔ Role-Based Authorization  
✔ Email OTP Verification  
✔ Cart System  
✔ Order Workflow  
✔ Admin Dashboard APIs  
✔ Image Upload via Cloudinary  
✔ Profile Management  

---

# 🚧 Future Enhancements

- Pagination
- Search & Filtering
- Sorting
- Order Status Validation Rules
- Soft Delete
- Payment Gateway Integration
- Analytics Dashboard
- Favorites / Wishlist

---

# 🧠 Key Learning Outcomes

- Implementing JWT authentication with Spring Security
- Designing secure REST APIs
- Role-based authorization
- Email OTP workflow
- File upload integration (Cloudinary)
- Clean layered architecture
- Full-stack integration (React + Spring Boot + MySQL)

---

# 👨‍💻 Author

**Karan Kumar Nonia**

---
