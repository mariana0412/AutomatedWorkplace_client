import './App.css';
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Goods from "./pages/Goods/Goods";
import Groups from "./pages/Groups/Groups";
import Login from "./pages/Login";
import AddEditGood from "./pages/Goods/AddEditGood";
import AddEditGroup from "./pages/Groups/AddEditGroup";

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/groups" element={<Groups/>} />
              <Route path="/groups/new" element={<AddEditGroup/>} />
              <Route path="/groups/:id" element={<AddEditGroup/>} />
              <Route path="/goods" element={<Goods/>} />
              <Route path="/goods/new" element={<AddEditGood/>} />
              <Route path='/goods/:id' element={<AddEditGood/>} />
          </Routes>
      </Router>
  )
}
export default App;
