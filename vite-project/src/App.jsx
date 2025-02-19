import Form from './Form';
import React from 'react';
import Counter from './Counter';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import Home from './Home';
import './App.css';
import Blog from './Blog';
import GeoQuiz from './GeoQuiz';
import Weather from './Weather';
import Todo from './Todo';
import Carte from './Geogame';
import GeoGame from './Geogame';
import "leaflet/dist/leaflet.css";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='counter' element={<Counter />} />
            <Route path='geoquiz' element={<GeoQuiz />} />
            <Route path='weather' element={<Weather />} />
            <Route path='todo' element={<Todo />} />
            <Route path='geogame' element={<GeoGame />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;