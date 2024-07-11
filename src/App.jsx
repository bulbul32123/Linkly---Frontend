import React from 'react';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import Footer from './components/footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Analyics from './Analyics';

function App() {
  return (
    <div className="pl-5 pr-5">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/analyics" element={<Analyics />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
