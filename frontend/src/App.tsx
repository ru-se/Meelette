import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./Home"
import Select from "./Select"
import Genre from "./Genre"
import GenreRoulette from "./GenreRoulette"
import GenreResult from "./GenreResult"
import Shop from "./Shop"
import ShopRoulette from "./ShopRoulette"
import ShopResult from "./ShopResult"

const App: React.FC = () =>{
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Select" element={<Select />} />
      <Route path="/Genre" element={<Genre />} />
      <Route path="/GenreRoulette" element={<GenreRoulette />} />
      <Route path="/GenreResult" element={<GenreResult />} />
      <Route path="/Shop" element={<Shop />} />
      <Route path="/ShopROulette" element={<ShopRoulette />} />
      <Route path="/ShopResult" element={<ShopResult />} />

      </Routes>
    </Router>
  )
}

export default App;
