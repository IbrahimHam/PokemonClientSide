import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PokemonDetail from "./components/PokemonDetail";
import PokemonInfo from "./components/PokemonInfo";
import PokemonBattle from "./components/PokemonBattle";
import HeaderNavBar from "./components/HeaderNavBar";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <BrowserRouter>
      <HeaderNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/pokemon/:id/:info" element={<PokemonInfo />} />
        <Route path="/battle" element={<PokemonBattle />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
