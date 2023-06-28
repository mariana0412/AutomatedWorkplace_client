import './App.css';
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Goods from "./pages/Goods";
import Groups from "./pages/Groups/Groups";
import Login from "./pages/Login";
import AddEditGroup from "./pages/Groups/AddEditGroup";

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/groups" element={<Groups/>} />
              <Route path="/groups/add" element={<AddEditGroup/>} />
              <Route path="/groups/add/:id" element={<AddEditGroup/>} />
              <Route path="/goods" element={<Goods/>} />
              <Route path="/login" element={<Login/>} />
          </Routes>
      </Router>
  )
}
export default App;
