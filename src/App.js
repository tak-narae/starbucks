import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";

import Header from "components/layout/Header";
import Main from "pages/Main";
import Menu from "pages/Menu/Menu";
import Detail from "pages/Menu/Detail";
import DetailInfo from "pages/Menu/DetailInfo";
import Coffee from "pages/Menu/Coffee/Coffee";
import Product from "pages/Menu/Product/Product";
import Beverage from "pages/Menu/Beverage/Beverage";
import Food from "pages/Menu/Food/Food";
import Cart from "pages/Order/Cart";
import Event from "pages/Event/Event";
import EventDetail from "pages/Event/EventDetail";
import Notice from "pages/Notice/Notice";
import NoticeDetail from "pages/Notice/NoticeDetail";
import Store from "pages/Store/Store";
import Footer from "components/layout/Footer";
import Guide from "pages/guide/Guide";
import UtilProvider from "hooks/UtilContext";

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
      const response = await axios.get(
        `https://raw.githubusercontent.com/deliondane/db/main/db.json`
      );
      setCoffee(response.data.coffee);
      setBeverage(response.data.beverage);
      setProduct(response.data.product);
      setFood(response.data.food);
      setNotice(response.data.notice);
      console.log(response.data.events);
      // setEvents(response.data.events);

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
        <UtilProvider>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/menu/" element={<Menu />}>
              <Route path="coffee" element={<Coffee />}></Route>
              <Route path="product" element={<Product />}></Route>
              <Route path="beverage" element={<Beverage />}></Route>
              <Route path="food" element={<Food />}></Route>
            </Route>
            <Route path="/menu/detail/:category" element={<Detail />}></Route>
            <Route path="/menu/info/:category" element={<DetailInfo />}></Route>
            <Route path="/order/">
              <Route path="cart" element={<Cart />}></Route>
            </Route>
            <Route path="/event" element={<Event />}></Route>
            <Route path="/event/:category/:idx" element={<EventDetail />}></Route>
            <Route path="/notice" element={<Notice />}></Route>
            <Route path="/notice/:idx" element={<NoticeDetail />}></Route>
            <Route path="/store" element={<Store />}></Route>
            <Route path="/guide" element={<Guide />}></Route>
          </Routes>
          <Footer />
        </UtilProvider>
      </DataContext.Provider>
    </>
  );
}

export default App;
export { DataContext };
