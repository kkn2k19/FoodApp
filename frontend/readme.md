# 🍔 FoodApp Frontend

Frontend for the **FoodApp Full Stack Application**.

Built using **React.js**, **React Router**, **Axios**, **Bootstrap**, and **Tailwind CSS**.  
This frontend connects to the Spring Boot backend API and supports both **USER** and **ADMIN** roles.

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/kkn2k19/FoodApp.git
```

## 2️⃣ Navigate to Frontend Folder

```bash
cd FoodApp/frontend
```

## 3️⃣ Install Dependencies

```bash
npm install
```

## 4️⃣ Create Environment File

Create a `.env` file inside the `frontend` folder:

```
REACT_APP_API_URL=http://localhost:10000
```

⚠️ Make sure your backend is running on port **10000**

## 5️⃣ Start Development Server

```bash
npm start
```

Application will run at:

```
http://localhost:3000
```

---

# 🚀 Tech Stack

- React.js
- React Router DOM
- Axios
- Bootstrap
- Tailwind CSS
- JWT Authentication
- Role-Based Protected Routes

---

# 📁 Project Structure

```
frontend/
│
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Register.jsx
│   │   ├── Login.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── VerifyOtp.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── FoodDetails.jsx
│   │   ├── RestaurantDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Orders.jsx
│   │   ├── OrdersDetails.jsx
│   │   ├── Profile.jsx
│   │   ├── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── ManageFoods.jsx
│   │       ├── ManageRestaurants.jsx
│   │       ├── ManageOrders.jsx
│   │       ├── EditProfile.jsx
│   │       ├── ChangePassword.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── index.js
│
├── .env
├── package.json
```

---

# 🔐 Authentication System

This project uses **JWT Authentication**.

- Token stored in `localStorage`
- Automatically attached via Axios interceptor
- Role-based route protection using `ProtectedRoute`

### Axios Configuration

```js
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
```

---

# 👤 USER FEATURES

### 🌍 Public Access
- View all foods
- View restaurant details
- View food details

### 🔐 Authentication
- Register (USER / ADMIN role)
- Email OTP verification
- Login
- Forgot password (OTP based)
- Reset password
- Resend OTP

### 🛒 Cart & Orders
- Add to cart
- Update quantity (+ / -)
- Remove item
- Real-time total calculation
- Place order
- View my orders
- View order details
- Cancel order (if PENDING)

### 👤 Profile
- View profile
- Edit name, phone, pincode
- Auto fetch city & state via pincode
- Change password

---

# 👑 ADMIN FEATURES

After login with ADMIN role:

### 🏠 Admin Dashboard
- Manage Restaurants
- Manage Foods
- Manage Orders

### 🍽 Manage Foods
- Add food (with image upload)
- Edit food (with or without image)
- Delete food
- Select restaurant while adding

### 🏢 Manage Restaurants
- Add restaurant
- Edit restaurant
- Delete restaurant

### 📦 Manage Orders
- View all user orders
- View order details
- Update order status:
  - PENDING
  - CONFIRMED
  - OUT_FOR_DELIVERY
  - DELIVERED
  - CANCELLED

### 👤 Profile
- Edit profile
- Change password

---

# 🔒 Route Protection Example

```jsx
<ProtectedRoute roleRequired="USER">
    <Cart />
</ProtectedRoute>
```

```jsx
<ProtectedRoute roleRequired="ADMIN">
    <AdminDashboard />
</ProtectedRoute>
```

---

# 🔗 Backend Requirement

Backend must be running at:

```
http://localhost:10000
```

Make sure to configure backend `.env` properly.

---

# 📌 Current Status

✔️ Authentication complete  
✔️ Email OTP verification  
✔️ Role-based UI  
✔️ Cart & Order Flow  
✔️ Admin Panel  
✔️ Image Upload via Cloudinary  
✔️ Profile Management  

---

# 🚧 Future Improvements

- Pagination (Foods, Restaurants, Orders)
- Search & Filtering (by category, restaurant, price range)
- Sorting (price low → high, high → low, newest first)
- Order Status Restrictions (prevent invalid status transitions)
- Soft Delete (for foods, restaurants, users instead of permanent deletion)
- Analytics Dashboard (admin insights: revenue, orders, users)
- Payment Gateway Integration
- Favorites / Wishlist System

---

# 👨‍💻 Author

**Karan Kumar Nonia**  

---
