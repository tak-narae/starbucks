import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import useProductMatch from "hooks/ProductMatch.js";

const Cart = () => {
  // const { productMatch } = useProductMatch(); // 커스텀 훅 호출

  const [cartList, setCartList] = useState([]);
  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem("cartData")) || [];
    setCartList(storedCartData);
  }, []);
  // localStorage.removeItem("cartData"); //삭제
  
  console.log("장바구니리스트===",cartList);
  console.log("장바구니리스트===",cartList.length);
  return (
    <>
      <div id="container" className="cart">
        <div className="layout_fix">
          <div className="heading">
            <h2 className="tit">장바구니</h2>
          </div>
          <table className="tb_prd">
            <caption>장바구니</caption>
            <thead>
              <tr>
                <th>
                  <div className="chk_item">
                    <input type="checkbox"/>
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
                    <tr key={idx}>
                      <td className="chk">
                        <div className="chk_item">
                          <input type="checkbox"/>
                          <label><span className="chk"></span></label>
                        </div>
                      </td>
                      <td>
                        <Link onClick={e => e.preventDefault()}>
                          <img style={{width:"80px"}} src={`${process.env.PUBLIC_URL}/${el.img}`} alt={el.name}/>
                          <span>{el.name}</span>
                        </Link>
                      </td>
                      <td>
                        <div className="btn_qty">
                          <button className="minus">-</button>
                          <input type="tel" className="qty" value={el.qty} maxLength="4" readOnly/>
                          <button className="plus">+</button>
                        </div>
                      </td>
                      <td>{el.price}</td>
                      <td className="total_price">{el.price}합산</td>
                      <td><button>삭제</button></td>
                    </tr>
                  )) 
              ) : (
                <tr className="empty"><td colSpan="6">장바구니에 담긴 상품이 없습니다</td></tr>
              ) }
               
            </tbody>
          </table>

        </div>
      </div>
    </>
  );
};

export default Cart;