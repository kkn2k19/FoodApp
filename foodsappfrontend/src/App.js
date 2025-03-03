// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Nav from './components/Nav';
import { Routes, Route } from 'react-router-dom'
import Food from './components/Food';
import FoodList from './components/FoodList';
import AddFood from './components/AddFood';
import DeleteFood from './components/DeleteFood';
import SearchFood from './components/SearchFood';
import UpdateFood from './components/UpdateFood';
function App() {
  return (
    <div className="App">
      <h2>FOOD APP</h2>
      <Nav />
      <Routes>

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
