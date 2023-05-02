import logo from "./logo.svg";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import HomePages from "./Pages/HomePages";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import PageeNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Policy" element={<Policy />} />
        <Route path="*" element={<PageeNotFound />} />
      </Routes>
    </>
  );
}

export default App;
