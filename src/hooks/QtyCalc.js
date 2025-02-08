const QtyCalc = (setCartList, setPriceQtyCalc) => {
  const spinners = document.querySelectorAll(".btn_qty");
  // console.log(`.btn_qty 몇개 ??? ${spinners.length}`);

  if (spinners.length === 0) return;

  spinners.forEach((spinner) => {
    // console.log("spinner===", spinner);
    const minus = spinner.querySelector(".minus");
    const plus = spinner.querySelector(".plus");
    const qtyEl = spinner.querySelector(".qty");

    if (parseInt(qtyEl.value) <= 1) {
      minus.classList.add("disabled");
    }

    const updatePrice = () => {

      if (document.querySelector("#container").classList.contains("prd__detail")) {
        const totalPriceEl = spinner.closest(".total_item").querySelector(".total_price");
        const originPrice = parseInt(document.querySelector('[class^="prd__detail"] .prd_item .info_cont .price').textContent.replaceAll(",", ""));
        // console.log(originPrice, "*" ,qtyEl.value, "=" ,totalPriceEl.textContent);
        totalPriceEl.textContent = (originPrice * qtyEl.value).toLocaleString() + "원";
      }

      if (document.querySelector("#container").classList.contains("order__cart")) {
        // *##### const cartData = JSON.parse(localStorage.getItem("cartData")) || []; //##origin
        const cartData = JSON.parse(localStorage.getItem("cartData")) || []; //##origin
        // const cartData = cartList; //##수량변경시

        // console.log("getLocal==",cartData)
        // console.log("cartList==",cartData2)

        const trID = spinner.closest("tr").dataset.id; //typeof string
        const item = cartData.find((el) => el.key === parseInt(trID)); //el.key number

        item.qty = parseInt(qtyEl.value); //로컬 해당정보 수량 업데이트

        const totalPriceEl = spinner.closest("tr").querySelector(".total_price");
        totalPriceEl.textContent = (item.price * parseInt(qtyEl.value)).toLocaleString() + "원";


        //##수량변경시 상태 전달 및 업데이트
        const priceItems = cartData.map(item => item.qty * item.price );
        // const priceItems = cartData.map(item => {
        //   return {
        //     key: item.key,
        //     price: item.qty * item.price
        //   }
        // });
        setPriceQtyCalc(priceItems);
        setCartList(cartData);
        


        // console.log(cartList, "====" ,cartData);
        console.log("!!!!!!!!?", cartData);
        localStorage.setItem("cartData", JSON.stringify(cartData));

        

        // console.log("지나감????")
        // const totalPrice = isCheckedKey.reduce((total, item) => {
        //   return total + (item.qty * item.price);
        // }, 0); // 초기값 0설정
        // setSave(totalPrice);
        // setCartList(cartData);
      }
    };

    plus.addEventListener("click", (e) => {
      let qtyValue = parseInt(qtyEl.value) || 0;
      console.log("##들어옴##", qtyValue);
      qtyValue += 1;
      qtyEl.value = qtyValue;
      e.target.parentElement.querySelector("input").setAttribute("data-qty", qtyValue);
      console.log(qtyEl.value, "++++", qtyValue);
      if (qtyValue > 1) {
        minus.classList.remove("disabled");
      }
      console.log("++==", qtyValue);
      updatePrice();
    });

    minus.addEventListener("click", (e) => {
      let qtyValue = parseInt(qtyEl.value) || 0;
      console.log("%들어옴%", qtyValue);
      if (qtyValue > 1) {
        qtyValue -= 1;
        qtyEl.value = qtyValue;
        e.target.parentElement.querySelector("input").setAttribute("data-qty", qtyValue);
        console.log(qtyEl.value, "----", qtyValue);
        if (qtyValue <= 1) {
          minus.classList.add("disabled");
        }
        console.log("--==", qtyValue);
        updatePrice();
      }
    });


  });
};

export default QtyCalc;
