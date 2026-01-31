// import logo from './logo.svg';
// import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Nav from './components/Navbar';
import { Routes, Route } from 'react-router-dom'
import Food from './components/Food';
import FoodList from './components/FoodList';
import AddFood from './components/AddFood';
import DeleteFood from './components/DeleteFood';
import SearchFood from './components/SearchFood';
import UpdateFood from './components/UpdateFood';
// import Home from './components/Home';
// import Register from './components/Register';
// import Login from './components/Login';
import NavClient from './components/NavClient';
import AddOrder from './components/AddOrder';
import Billing from './components/Billing';
import Contact from './components/Contact';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      {/* <h2>FOOD APP</h2> */}
      {<Navbar/>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/nav' element={<Nav />} />
        <Route path='/navclient' element={<NavClient />} />
        <Route path='/order' element={<AddOrder />} />
        <Route path='/billing' element={<Billing />} />
        <Route path='/contact' element={<Contact />} />

        <Route path='/food' element={<Food />} >
          <Route path="add" element={<AddFood />} />
          <Route path="update" element={<UpdateFood />} />
          <Route path="delete" element={<DeleteFood />} />
        </Route>

        <Route path='/flist' element={<FoodList />} />
        <Route path='/sfood' element={<SearchFood />} />

      </Routes>
    </div>
  );
}

export default App;
