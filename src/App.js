import './App.css';
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Goods from "./pages/Goods/Goods";
import Groups from "./pages/Groups";
import Login from "./pages/Login";
import AddGood from "./pages/Goods/AddGood";

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/groups" element={<Groups/>} />
              <Route path="/goods" element={<Goods/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/goods/new" element={<AddGood/>} />
              <Route path='/goods/:id' element={<AddGood/>}/>
          </Routes>
      </Router>
  )
}
export default App;
