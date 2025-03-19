import React, { useEffect, useState } from 'react';
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
import AddShop from "./AddShop"

const App: React.FC = () =>{

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/sql-data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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
      <Route path="/AddShop" element={<AddShop />} />

      </Routes>
      <div>
        <h1>Data from /sql-data</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </Router>
  )
}

export default App;
