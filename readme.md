# 🍔 FoodApp – Full Stack Food Ordering Platform

A complete full-stack food ordering web application built using:

- **Spring Boot (Java 21)**
- **React.js**
- **MySQL**
- **JWT Authentication**

This platform supports both **USER** and **ADMIN** roles with secure authentication, email OTP verification, cart system, order workflow, and a complete admin dashboard.

---

# 🚀 Live Architecture Overview

Frontend (React + Tailwind + Axios)  
⬇  
Backend (Spring Boot + Spring Security + JWT)  
⬇  
MySQL Database  

External Services:
- 📧 Gmail SMTP (Email OTP Verification)
- ☁️ Cloudinary (Image Upload & Storage)

---

# 🛠 Tech Stack

## 🔹 Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Bootstrap
- JWT Authentication
- Role-Based Protected Routes

## 🔹 Backend
- Spring Boot (Java 21)
- Spring Security
- JWT (jjwt 0.11.5)
- Spring Data JPA
- MySQL
- Spring Mail (OTP)
- Cloudinary
- Maven

## 🔹 Database
- MySQL

---

# 📁 Project Structure

```
FoodApp/
│
├── backend/
│   ├── src/main/java/com/karan/
│   │   ├── config/          # Security, CORS, Cloudinary
│   │   ├── controller/      # REST Controllers
│   │   ├── dto/             # Request & Response DTOs
│   │   ├── enums/           # Role & Verification Enums
│   │   ├── mapper/          # Entity ↔ DTO Mappers
│   │   ├── model/           # JPA Entities
│   │   ├── repository/      # JPA Repositories
│   │   ├── security/        # JWT & Auth Filter
│   │   └── service/         # Business Logic Layer
│   │
│   ├── src/main/resources/
│   │   └── application.properties
│   │
│   ├── Dockerfile
│   ├── pom.xml
│   └── README.md
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/      # Navbar, ProtectedRoute
│   │   ├── pages/           # All user & admin pages
│   │   │   └── admin/       # Admin Dashboard & Management Pages
│   │   ├── services/        # Axios API Config
│   │   ├── App.jsx
│   │   └── index.js
│   │
│   ├── .env
│   ├── package.json
│   └── README.md
│
└── README.md
```


---

# 🔐 Authentication & Security

- JWT-based authentication
- Role-based authorization (USER / ADMIN)
- Secure REST APIs using Spring Security
- Protected frontend routes
- Email OTP verification (Account activation)
- Password reset via OTP
- BCrypt password hashing
- Stateless session management
- Axios interceptor for automatic token attachment

---

# 👤 USER FEATURES

## 🌍 Public Access
- View all foods
- View restaurant details
- View food details

## 🔐 Authentication
- Register (USER / ADMIN role)
- Email OTP verification
- Login
- Forgot password
- Reset password
- Resend OTP

## 🛒 Cart System
- Add to cart
- Update quantity (+ / -)
- Remove items
- Real-time total calculation
- Clear cart

## 📦 Order System
- Place order
- View my orders
- View order details
- Cancel order (if PENDING)

## 👤 Profile
- View profile
- Edit name, phone, pincode
- Auto fetch city & state via pincode
- Change password

---

# 👑 ADMIN FEATURES

## 🏠 Admin Dashboard
- Manage Restaurants
- Manage Foods
- Manage Orders

## 🍽 Manage Foods
- Add food (with image upload)
- Edit food (with or without image)
- Delete food
- Select restaurant while adding

## 🏢 Manage Restaurants
- Add restaurant
- Edit restaurant
- Delete restaurant

## 📦 Manage Orders
- View all users' orders
- View order details
- Update order status:
  - PENDING
  - CONFIRMED
  - OUT_FOR_DELIVERY
  - DELIVERED
  - CANCELLED

## 👤 Admin Profile
- Edit profile
- Change password

---

# 🔄 Order Workflow

### USER Flow
Cart → Place Order → Order Created (PENDING)

### ADMIN Flow
PENDING → CONFIRMED → OUT_FOR_DELIVERY → DELIVERED  
OR → CANCELLED

---

# ⚙️ Running the Project Locally

---

# 🧾 1️⃣ Clone the Repository

```bash
git clone https://github.com/kkn2k19/FoodApp.git
cd FoodApp
```

---

# 🔹 Backend Setup

## Step 1: Navigate to backend folder

```bash
cd backend
```

## Step 2: Configure Environment Variables

Update `application.properties` OR use environment variables:

```bash
DB_URL=jdbc:mysql://localhost:3306/foodapp
DB_USER=root
DB_PASSWORD=your_password

SERVER_PORT=10000

JWT_SECRET=your_secret_key
JWT_EXPIRATION=86400000

MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password

CLOUDINARY_CLOUDNAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Make sure:
- MySQL is running
- Database `foodapp` exists

## Step 3: Run Backend

```bash
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:10000
```

---

# 🔹 Frontend Setup

## Step 1: Navigate to frontend folder

```bash
cd ../frontend
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Create `.env` File

Create a `.env` file inside `frontend/`:

```
REACT_APP_API_URL=http://localhost:10000
```

## Step 4: Start Frontend

```bash
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# 🔗 API Base URL

Frontend connects to:

```
http://localhost:10000
```

All APIs are under:

```
/api/*
```

---

# 📌 Current Status

✔ JWT Authentication  
✔ Email OTP Verification  
✔ Role-Based Authorization  
✔ Cart System  
✔ Order Workflow  
✔ Admin Dashboard  
✔ Image Upload via Cloudinary  
✔ Profile Management  
✔ Secure REST APIs  
✔ Clean Layered Architecture  

---

# 🚧 Future Improvements

- Pagination (Foods, Restaurants, Orders)
- Search & Filtering (category, restaurant, price range)
- Sorting (price low → high, high → low, newest)
- Order Status Restrictions (prevent invalid transitions)
- Soft Delete (logical deletion instead of permanent removal)
- Analytics Dashboard (Admin revenue & order insights)
- Payment Gateway Integration
- Favorites / Wishlist System

---

# 👨‍💻 Author

**Karan Kumar Nonia**  

---
