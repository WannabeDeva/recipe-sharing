import "./App.css";
import Login from "./components/Login";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import PrivateComponent from "./components/PrivateComponent";
import Recipes from "./components/Recipes";
import AddRecipe from "./components/AddRecipe";
import LikedProducts from "./components/likedProducts";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        <Route element={<PrivateComponent />}>
          <Route path="/favouriteRecipes" element={<LikedProducts />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/" element={<Home />} />
          <Route path="/addRecipe" element={<AddRecipe />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
