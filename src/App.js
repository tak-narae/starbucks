import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from 'components/layout/Header';
import Main from 'pages/Main';
import Coffee from 'pages/Coffee/Coffee';
import Product from 'pages/Product/Product';
import Beverage from 'pages/Beverage/Beverage';
import Food from 'pages/Food/Food';
import Event from 'pages/Event/Event';
import Notice from 'pages/Notice/Notice';
import Store from 'pages/Store/Store';
import Footer from 'components/layout/Footer';
import Guide from 'pages/guide/Guide';

const DataContext = createContext();

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false)
  }, [])
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/guide" element={<Guide />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
export { DataContext };