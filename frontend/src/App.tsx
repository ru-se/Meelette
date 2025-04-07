import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./Home"
import Select from "./Select"
import Genre from "./Genre"
import GenreRoulette from "./GenreRoulette"
import GenreResult from "./GenreResult"
import Shoptest from "./Shopteat"
import ShopRoulette from "./ShopRoulette"
import ShopResult from "./ShopResult"
import AddShop from "./AddShop"
// import Roulette from "./Roulette"
import MapPage from "./ShopResult";
import Map from './Map'; 


const App: React.FC = () =>{

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Select" element={<Select />} />
      <Route path="/Genre" element={<Genre />} />
      <Route path="/GenreRoulette" element={<GenreRoulette />} />
      <Route path="/GenreResult" element={<GenreResult />} />
      <Route path="/Shoptest" element={<Shoptest />} />
      <Route path="/ShopRoulette" element={<ShopRoulette />} />
      {/* <Route path="/ShopResult" element={<ShopResult />} /> */}
      <Route path="/AddShop" element={<AddShop />} />
      {/* <Route path="/Roulette" element={<Roulette />} /> */}
      <Route path="/map" element={<MapPage />} />
      <Route path="/map" element={<Map />} /> 
     

     

      </Routes>
      {/* <script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&async=1,`}
        async
        defer
      ></script> */}

        {/* <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places,marker&callback=initMap`}
          async
        ></script> */}

        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places,marker&async=1`}
          async
        ></script>



      <div>
        {/* <h1>Data from /sql-data</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </Router>
  )
}

export default App;
