import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
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
import SignUp from "pages/Member/SignUp";
import SignUpStep from "pages/Member/SignUpStep";
import Login from "pages/Member/Login";
import { AccessTokenProvider } from "pages/Member/AccessTokenContext";

const DataContext = createContext();

function App() {
  const [coffee, setCoffee] = useState([]);
  const [beverage, setBeverage] = useState([]);
  const [product, setProduct] = useState([]);
  const [food, setFood] = useState([]);
  const [notice, setNotice] = useState([]);
  const [events, setEvents] = useState([]);
  const [resMz, setResMz] = useState([]);

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
      setEvents(response.data.events);
      setResMz(response.data.reserveMegazine);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [loadPercentage, setLoadPercentage] = useState(0);
  useEffect(()=>{
    console.log("###LoadTest###",location);
    window.scrollTo({ top: 0 });
    let timeout = null;
    let interval = null;
    timeout = setTimeout(()=>{ //1초이상 걸리면 실행
      setLoading(true);
    }, 1000)
    interval = setInterval(()=>{
      setLoadPercentage((time) => {
        if(time >= 100){
          clearTimeout(timeout);
          clearInterval(interval);
          console.log("##로딩사라짐##");
          setLoading(false);
          return 100;
        }
        return time + 4; //비율 증가
      });
    }, 40)
    return ()=> {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  },[location])

  return (
    <AccessTokenProvider>
      { AccessTokenProvider && loading && (
        <div id="modal" className="modal_load">
          <div className="load_cont">
            <img src={require("../src/images/loading_bg.png")} alt="스타벅스 로딩 로고"/>
            <div className="cover_fill">
              <div className="fill" style={{height:`${loadPercentage}px`}}></div>
            </div>
          </div>
        </div>
      ) }
      <Header />
      <DataContext.Provider value={{ loading, coffee, setCoffee, beverage, setBeverage, product, setProduct, food, setFood, notice, setNotice, events, setEvents, resMz, setResMz }}>
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
            <Route path="/event/:idx" element={<EventDetail />}></Route>
            <Route path="/notice" element={<Notice />}></Route>
            <Route path="/notice/:idx" element={<NoticeDetail />}></Route>
            <Route path="/store" element={<Store />}></Route>
            <Route path="/guide" element={<Guide />}></Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup?step?reload=true" element={<SignUpStep />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </UtilProvider>
      </DataContext.Provider>
    </AccessTokenProvider>
  );
}

export default App;
export { DataContext };
