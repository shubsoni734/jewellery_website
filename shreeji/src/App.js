import logo from "./logo.svg";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import HomePages from "./Pages/HomePages";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import PageeNotFound from "./Pages/PageNotFound";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Dashbord from "./Pages/user/Dashbord";
import PrivateRoute from "./Components/Routes/Private";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashbord" element={<PrivateRoute />}>
          <Route path="" element={<Dashbord />} />
        </Route>
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageeNotFound />} />
      </Routes>
    </>
  );
}

export default App;
