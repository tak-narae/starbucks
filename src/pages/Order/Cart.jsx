import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


import ProductLinkMatch from "hooks/ProductLinkMatch.js";
import QtyCalc from "hooks/QtyCalc.js";

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  
  useEffect(() => {
    const localCartData = JSON.parse(localStorage.getItem("cartData")) || [];
    setCartList(localCartData);
  }, []);
  // localStorage.removeItem("cartData"); // 삭제
  
  
  useEffect(()=>{
    QtyCalc(cartList, setCartList);
  },[cartList])


  // document.querySelectorAll("input[type='checkbox']").forEach(function(el){
  //   el.addEventListener("change", function(){
  //     console.log(el)
  //   })
  // })

  
  const [isChecked, setIsChecked] = useState([]);
  const chkChange = (key)=>{
    console.log(key, isChecked.includes(key));
  }


  // useEffect(()=>{
  //   document.querySelectorAll("input[type='checkbox']").forEach(el => {
  //     el.checked = isChecked;
  //   })
  // },[isChecked])

  const localCartDelete = (key)=>{
    // console.log(key);
    const localCartUpdate = cartList.filter((el) => el.key !== key);
    setCartList(localCartUpdate);
    localStorage.setItem("cartData", JSON.stringify(localCartUpdate));
  }
  
  ProductLinkMatch();

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
              <thead>
                <tr>
                  <th>
                    <div className="chk_item">
                      <input type="checkbox" name="chk_all"/>
                      <label><span className="chk"></span></label>
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
                    cartList.map((el,idx)=>(
                      <tr key={idx} data-id={el.key}>
                        <td className="chk">
                          <div className="chk_item">
                            <input type="checkbox" name={el.key} checked={isChecked.includes(el.key) ? true : false} onChange={()=>chkChange(el.key)}/>
                            <label><span className="chk"></span></label>
                          </div>
                        </td>
                        <td>
                          <Link>
                            <img style={{width:"80px"}} src={`${process.env.PUBLIC_URL}/${el.img}`} alt={el.name}/>
                            <p className="name">{el.name}</p>
                          </Link>
                        </td>
                        <td>
                          <div className="btn_qty">
                            <button className="minus">-</button>
                            <input type="tel" className="qty" value={el.qty} maxLength="4" readOnly/>
                            <button className="plus">+</button>
                          </div>
                        </td>
                        <td className="price">{el.price.toLocaleString()}원</td>
                        <td className="total_price">{(el.price * el.qty).toLocaleString()}원</td>
                        <td onClick={()=> localCartDelete(el.key) }><button>삭제</button></td>
                      </tr>
                    )) 
                ) : (
                  <tr className="empty"><td colSpan="6">장바구니에 담긴 상품이 없습니다</td></tr>
                ) }
                
              </tbody>
            </table>
          </div>


        </div>
      </div>
    </>
  );
};

export default Cart;