import "bootstrap/dist/css/bootstrap.css";
import Nav from './components/Navbar';
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import FoodDetails from "./pages/FoodDetails";
import RestaurantDetails from "./pages/RestaurantDetails";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OrdersDetails from "./pages/OrdersDetails";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import ManageFoods from "./pages/admin/ManageFoods";
import ManageRestaurants from "./pages/admin/ManageRestaurants";
function App() {
  return (
    <div className="App">
      {/* <h2>FOOD APP</h2> */}
      {<Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/nav' element={<Nav />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <Route path='/navclient' element={<NavClient />} />
        <Route path='/order' element={<AddOrder />} />
        <Route path='/billing' element={<Billing />} />
        <Route path='/contact' element={<Contact />} /> */}

        <Route path='/food/:id' element={<FoodDetails />} />
        <Route path='/restaurants/:id' element={<RestaurantDetails />} />
        {/* <Route path='/cart' element={<Cart />} /> */}
        <Route path="/cart"
          element={
            <ProtectedRoute roleRequired="USER">
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          } />

        <Route path="/admin/foods" element={
          <ProtectedRoute roleRequired="ADMIN">
            <ManageFoods />
          </ProtectedRoute>
        } />
        <Route path="/admin/restaurants" element={
          <ProtectedRoute roleRequired="ADMIN">
            <ManageRestaurants />
          </ProtectedRoute>
        } />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrdersDetails />
            </ProtectedRoute>
          }></Route>

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* <Route path="add" element={<AddFood />} />
          <Route path="update" element={<UpdateFood />} />
          <Route path="delete" element={<DeleteFood />} /> */}
        {/* </Route> */}

        {/* <Route path='/flist' element={<FoodList />} />
        <Route path='/sfood' element={<SearchFood />} /> */}

      </Routes>
    </div>
  );
}

export default App;
