import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import "./utilities.css";
import { AuthContextProvider } from "./context/authContext";
import OutletPage from "./setOutlet/outlet";
import AddRecipes from "./components/addRecipes/addRecipes";
import ShopList from "./pages/shopList/shopList";
import RecipeCalendar from "./pages/RecipeCalendar/recipeCalendar";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/user" element={<OutletPage />}>
            <Route index element={<Home />} />
            <Route path="recipe" element={<AddRecipes />} />
            <Route path="shop" element={<ShopList />} />
            <Route path="calendar" element={<RecipeCalendar />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
