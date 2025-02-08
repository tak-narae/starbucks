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
      QtyCalc(cartList, setCartList, setSave);
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
  const [ isCheckedKey, setIsCheckedKey ] = useState(JSON.parse(localStorage.getItem("cartData"))?.map(item=>item.key)); //(처음)true
  const [ isCheckedItem, setIsCheckedItem ] = useState([]);
  
  const chkChange = (key) => { //선택체크
    setIsCheckedKey(prev => prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key] );//키있는지 체크해서 없으면 넣음
  };

  useEffect(()=>{ //아이템 삭제시 업데이트
    setIsCheckedKey(prev => prev.filter(el => el !== deleteItem.key));
  },[deleteItem])
  useEffect(()=>{ //아이템 선택시
    cartList.length === isCheckedKey.length ? setIsCheckedAll(true) : setIsCheckedAll(false); //전체체크
    setIsCheckedItem(cartList.filter(item => isCheckedKey.includes(item.key))); //선택아이템
    // setIsCheckedItem(JSON.parse(localStorage.getItem("cartData")).filter(item => isChecked.includes(item.key)));
  },[isCheckedKey])
  
  // #### // console.log("isCheckedItem", isCheckedKey, isCheckedItem);
  // console.log("isCheckedItem",isCheckedItem);

  // setIsCheckedItem(prev => JSON.parse(localStorage.getItem("cartData"))?.filter(item=>isCheckedKey.includes(item.key)));

  // const handlePrice = ()=>{
  //   // console.log("+-버튼클릭");
  //   console.log("&&&test", JSON.parse(localStorage.getItem("cartData"))?.filter(item=>isCheckedKey.includes(item.key)));
  //   setSave(JSON.parse(localStorage.getItem("cartData"))?.filter(item=>isCheckedKey.includes(item.key)));
  // }

  
  // const calculateTotal = () => {
    //   console.log("&&&가격확인&&&")
    //   const filteredItems = JSON.parse(localStorage.getItem("cartData"))?.filter(item => isCheckedKey.includes(item.key));
    //   const totalPrice = filteredItems.reduce((total, item) => {
      //     return total + item.price * item.qty; // 가격 * 수량을 더함
      //   }, 0);
      //   return totalPrice;
      // };


      // ===========================================


      const [save, setSave] = useState({});
      // useEffect(() => {
      //   const calculateTotal = () => {
      //     // const filteredItems = JSON.parse(localStorage.getItem("cartData"))?.filter(item => isCheckedKey.includes(item.key));
      //     const filteredItems = cartList.filter(item => isCheckedKey.includes(item.key));
      //     const totalPrice = filteredItems.reduce((total, item) => {
      //       return total + (item.qty * item.price);
      //     }, 0); // 초기값 0설정
      //     // setSave(totalPrice);
      //     return totalPrice;
      //   };
      //   // calculateTotal();
      //   setSave(calculateTotal());
      //   // console.log("체크및계산호출==", save);
      // }, [isCheckedKey, save]);

      
      // useEffect(()=>{
      //   console.log("###수량변동###", );
      // },[save])
      useEffect(()=>{
        console.log("####리스트변동###", save, cartList)
      },[isCheckedKey, save])

      
  // const [save, setSave] = useState(0);
  // const calculateTotal = () => {
  //   const filteredItems = JSON.parse(localStorage.getItem("cartData"))?.filter(item => isCheckedKey.includes(item.key));
  //   const totalPrice = filteredItems.reduce((total, item, idx) => {
  //     console.log("도는중(())", total + (item.qty * item.price))
  //     setSave(total + (item.qty * item.price));
  //     return total + (item.qty * item.price);
  //   }, 0); //초기값 0설정
  //   // setSave(totalPrice);
  //   return totalPrice;
  // };

  // useEffect(() => {
  //   console.log("머ㅜ얌어ㅝ망")
  //   calculateTotal();
  //   console.log("save==", save)
  // }, [isCheckedKey]);

// =========================================


  // console.log("calculateTotal", calculateTotal());

  // console.log("ㅎ&*&*&*&ㅎ*", save);

  // useEffect(()=>{
    // calculateTotal();
  // },[isCheckedItem])

  
  // useEffect(()=>{
  //   console.log("뭔가변경~~")
  // },[isCartListQty])
  // console.log("isCartListQty",isCartListQty)

  







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
                      <input id="chk_all" type="checkbox" name="chk_all" checked={isCheckedAll} onChange={()=>{ setIsCheckedAll(state => !state); setIsCheckedKey(isCheckedAll ? [] : cartList.map(el=>el.key)) }}/>
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
                            <input id={el.key} type="checkbox" name={el.key} checked={isCheckedKey.includes(el.key)} onChange={()=>chkChange(el.key)}/>
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
                            <input type="tel" className="qty" value={el.qty} data-qty={el.qty} readOnly/>
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
              <ul>
                { isCheckedItem.map((el,idx) => (
                  <li key={idx}>
                    {/* <h2>{save}</h2> */}
                    {/* <h2><span>총합: {calculateTotal().toLocaleString()}원</span></h2> */}
                    {/* <h2><span>총합: {calculateTotal()}원</span></h2> */}
                    {/* <h2><span>총합: {console.log("총합?",save)}원</span></h2> */}
                    {/* <div>
                      <div>{el.qty}</div>
                      <div>{el.price}</div>
                      <div>{el.qty * el.price}</div>
                    </div> */}
                  </li>
                )) }
              </ul>
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default Cart;