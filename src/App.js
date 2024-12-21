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

const DataContext = createContext();

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false)
  }, [])
  return (
    <>
      <DataContext.Provider value={{ loading }}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/coffee/:id" element={<Coffee />}></Route >
          <Route path="/product/:id" element={<Product />}></Route >
          <Route path="/beverage/:id" element={<Beverage />}></Route >
          <Route path="/food/:id" element={<Food />}></Route >
          <Route path="/event" element={<Event />}></Route >
          <Route path="/notice" element={<Notice />}></Route >
          <Route path="/store" element={<Store />}></Route >
        </Routes>
        <Footer />
      </DataContext.Provider >
    </>
  );
}

export default App;
export { DataContext };