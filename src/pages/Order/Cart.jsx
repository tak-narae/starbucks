import React, { useEffect, useState, useRef,useLayoutEffect  } from "react";
import { Link } from "react-router-dom";

import ProductLinkMatch from "hooks/ProductLinkMatch.js";
import QtyCalc from "hooks/QtyCalc.js";

import "./Order.css";
import { isCancel } from "axios";

const Cart = () => {
  const [ cartList, setCartList ] = useState([]);
  const [ deleteItem, setDeleteItem ] = useState([]);

  useEffect(() => {
    //== 로컬스토리지 Detail에서 불러옴
    const localCartData = JSON.parse(localStorage.getItem("cartData")) || [];
    setCartList(localCartData);
  }, []);
  // localStorage.removeItem("cartData"); // 삭제
 

  //=== 수량조절
  const [isQty, setIsQty] = useState(true);
  useEffect(() => {
    if (isQty && cartList.length > 0) {
      setIsQty(false);
      QtyCalc();
    }
  }, [cartList, isQty]);

  // useEffect(()=>{
  //   let targets = document.querySelectorAll('td.total_price');
  //   let observer = new MutationObserver((mutations) => {
  //     alert('DOM 변경 감지');
  //     observer.disconnect(); // 한 번 알림 후 observer를 종료하여 계속 실행되지 않도록
  //   });
  //   let option = {
  //     childList: true,  // 자식 노드가 변경되었을 때만 감지
  //     characterData: true // 텍스트 내용이 변경되었을 때만 감지
  //   };
  //   targets.forEach(target => {
  //     observer.observe(target, option);
  //   });
  // },[cartList, isQty])

  //=== 삭제
  const localCartDelete = (key)=>{
    const localCartUpdate = cartList.filter((el) => el.key !== key); //삭제 외
    const localCartdelete = cartList.find((el) => el.key === key);//삭제아이템
    setDeleteItem(localCartdelete);
    setCartList(localCartUpdate);
    localStorage.setItem("cartData", JSON.stringify(localCartUpdate));
    console.log("delete!", localCartdelete);
  }
  ProductLinkMatch();


  //=== 체크박스
  const [ isCheckedAll, setIsCheckedAll ] = useState(true); //(처음) 전체true
  const [ isChecked, setIsChecked ] = useState(JSON.parse(localStorage.getItem("cartData"))?.map(item=>item.key)); //(처음)true
  const [ isCheckedItem, setIsCheckedItem ] = useState([]);

  const chkChange = (key) => { //선택체크
    setIsChecked(prev => prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key] );//키있는지 체크해서 없으면 넣음
  };
  useEffect(()=>{ //삭제아이템 발생시 업데이트
    setIsChecked(prev => prev.filter(el => el !== deleteItem.key));
  },[deleteItem])
  useEffect(()=>{ //전체체크
    cartList.length === isChecked.length ? setIsCheckedAll(true) : setIsCheckedAll(false);
    setIsCheckedItem(cartList.filter(item => isChecked.includes(item.key)));
  },[isChecked])
  
  console.log("isCheckedItem",isCheckedItem);
  

  // const [ observerText, setObserverText ] = useState(null);
  // console.log("observerText1111",observerText);
  // useEffect(()=>{
  //   console.log("observerText222",observerText);
  // },[observerText])
  // const refPrice = useRef(null);
  // useLayoutEffect(()=>{
  //   console.log("변동")
  // },[refPrice.current?.textContent])

  // console.log("isChecked",isChecked, cartList);



  return (
    <>
      <div id="container" className="order__cart">
        <div className="layout_fix">
          <div className="heading">
            <h2 className="tit">장바구니</h2>
          </div>
          <div className="prd_data">
            <table className="tb_prd">
              <caption>장바구니</caption>
              <colgroup>
                <col style={{width:"80px"}}/>
                <col style={{width:"auto"}}/>
                <col style={{width:"180px"}}/>
                <col style={{width:"120px"}}/>
                <col style={{width:"120px"}}/>
                <col style={{width:"120px"}}/>
              </colgroup>
              <thead>
                <tr>
                  <th>
                    <div className="chk_item">
                      <input id="chk_all" type="checkbox" name="chk_all" checked={isCheckedAll} onChange={()=>{ setIsCheckedAll(state => !state); setIsChecked(isCheckedAll ? [] : cartList.map(el=>el.key)) }}/>
                      <label htmlFor="chk_all"><span className="chk"></span></label>
                    </div>
                  </th>
                  <th>상품정보</th>
                  <th>수량</th>
                  <th>상품금액</th>
                  <th>주문금액</th>
                  <th>처리</th>
                </tr>
              </thead>
              <tbody>
                { cartList.length !== 0 ? (
                  cartList.slice().reverse().map((el,idx)=>( //리스트만 내림차순
                    <tr key={idx} data-id={el.key}>
                        <td className="chk">
                          <div className="chk_item">
                            {/* <input type="checkbox" name={el.key}/> */}
                            <input id={el.key} type="checkbox" name={el.key} checked={isChecked.includes(el.key)} onChange={()=>chkChange(el.key)}/>
                            <label htmlFor={el.key}><span className="chk"></span></label>
                          </div>
                        </td>
                        <td className="product">
                          <Link>
                            <img src={`${process.env.PUBLIC_URL}/${el.img}`} alt={el.name}/>
                            <div className="item">
                              <span className="group">{el.group}</span>
                              <p className="name">{el.name}</p>
                            </div>
                          </Link>
                        </td>
                        <td className="num">
                          <div className="btn_qty">
                            <button className="minus">-</button>
                            <input type="tel" className="qty" value={el.qty} maxLength="4" readOnly/>
                            <button className="plus">+</button>
                          </div>
                        </td>
                        <td className="price">{el.price.toLocaleString()}원</td>
                        <td className="total_price">{(el.price * el.qty).toLocaleString()}원</td>
                        <td className="action"><button onClick={()=> localCartDelete(el.key) }>삭제</button></td>
                      </tr>
                    )) 
                ) : (
                  <tr className="empty"><td colSpan="6">장바구니에 담긴 상품이 없습니다</td></tr>
                ) }
                
              </tbody>
            </table>
            <div className="total_cont">
              
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default Cart;