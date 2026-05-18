import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavorisProvider } from "./context/FavorisContext";
import Navbar from "./components/Navbar";
import Accueil from "./pages/Accueil";
import Detail from "./pages/Detail";
import Favoris from "./pages/Favoris";
import "./index.css";

export default function App() {
  return (
      <FavorisProvider>
        <BrowserRouter>
          <Navbar />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/serie/:id" element={<Detail />} />
              <Route path="/favoris" element={<Favoris />} />
            </Routes>
          </div>
        </BrowserRouter>
      </FavorisProvider>
  );
}