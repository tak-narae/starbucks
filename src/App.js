import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from "axios";

import './App.css';

import Header from 'components/layout/Header';
import Main from 'pages/Main';
import Menu from 'pages/Menu/Menu';
import Detail from 'pages/Menu/Detail';
import Coffee from 'pages/Coffee/Coffee';
import Product from 'pages/Product/Product';
import Beverage from 'pages/Beverage/Beverage';
import Food from 'pages/Food/Food';
import Event from 'pages/Event/Event';
import Notice from 'pages/Notice/Notice';
import Store from 'pages/Store/Store';
import Footer from 'components/layout/Footer';
import Guide from 'pages/guide/Guide';
import UtilProvider from 'hooks/UtilContext';

const DataContext = createContext();

function App() {
  const [loading, setLoading] = useState(true);
  // const [menuTit, setMenuTit] = useState([]);
  const [coffee, setCoffee] = useState([]);
  const [beverage, setBeverage] = useState([]);
  const [product, setProduct] = useState([]);
  const [food, setFood] = useState([]);
  const [notice, setNotice] = useState([]);
  const [events, setEvents] = useState([]);

  const getdata = async () => {
    try {
      const response = await axios.get(`https://raw.githubusercontent.com/deliondane/db/main/db.json`);
      // console.log(response.data);
      // setMenuTit(response.data);
      setCoffee(response.data.coffee);
      // console.log(response.data.coffee);
      setBeverage(response.data.beverage);
      // console.log(response.data.beverage);
      setProduct(response.data.product);
      setFood(response.data.food);
      setNotice(response.data.notice);
      console.log(response.data.events);
      setEvents(response.data.events);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  useEffect(() => {
    getdata();
    setLoading(false);
  }, []);
  return (
    <>
      <Header />
      <DataContext.Provider value={{ loading, coffee, setCoffee, beverage, setBeverage, product, setProduct, food, setFood, notice, setNotice, events, setEvents }}>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/menu/" element={<Menu />}>
            <Route path="coffee" element={<Coffee />}></Route>
            <Route path="product" element={<Product />}></Route>
            <Route path="beverage" element={<Beverage />}></Route>
            <Route path="food" element={<Food />}></Route>
          </Route>
          <Route path="/menu/detail/:category" element={<Detail />}></Route>
          <Route path="/event" element={<Event />}></Route>
          <Route path="/notice" element={<Notice />}></Route>
          <Route path="/store" element={<Store />}></Route>
          <Route path="/guide" element={<Guide />}></Route>
        </Routes>
        <Footer />
      </DataContext.Provider>
    </>
  );
}

export default App;
export { DataContext };