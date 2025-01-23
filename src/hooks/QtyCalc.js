
const QtyCalc = (cartList,setCartList) => {
  const spinners = document.querySelectorAll('.btn_qty');
  // console.log(`.btn_qty 몇개 ??? ${spinners.length}`);

  if (spinners.length === 0) return;

  spinners.forEach(spinner => {
    // console.log("spinner===", spinner);
    const minus = spinner.querySelector('.minus');
    const plus = spinner.querySelector('.plus');
    const qtyEl = spinner.querySelector('.qty');
    
    
    if (parseInt(qtyEl.value) <= 1) {
      minus.classList.add("disabled");
    }

    const updatePrice = () => {
      // console.log(new Date().toLocaleDateString())
      // console.log(Date.now())
      
      if(document.querySelector("#container").classList.contains("prd__detail")) {
        const totalPriceEl = spinner.closest('.total_item').querySelector('.total_price');
        const originPrice = parseInt(document.querySelector('[class^="prd__detail"] .prd_item .info_cont .price').textContent.replaceAll(',', ''));
        // console.log(originPrice, "*" ,qtyEl.value, "=" ,totalPriceEl.textContent);
        totalPriceEl.textContent = (originPrice * qtyEl.value).toLocaleString() + "원";
      }

      if(document.querySelector("#container").classList.contains("order__cart")) {
        const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
        const trID = spinner.closest("tr").dataset.id; //typeof string
        const item = cartData.find(el => el.key == trID); //el.key number

        item.qty = parseInt(qtyEl.value); //로컬 해당정보 수량 업데이트

        const totalPriceEl = spinner.closest('tr').querySelector('.total_price');
        totalPriceEl.textContent = (item.price * parseInt(qtyEl.value)).toLocaleString() + "원";

        // setCartList(cartData);

        console.log(item.qty)
        
        // console.log(cartList, "====" ,cartData);
        localStorage.setItem("cartData", JSON.stringify(cartData));
      }
    }

    minus.addEventListener('click', () => { //(((((())))))      
      let qtyValue = parseInt(qtyEl.value) || 0;
      if (qtyValue > 1) {
        qtyValue -= 1;
        qtyEl.value = qtyValue;
        if (qtyValue <= 1) {
          minus.classList.add("disabled");
        }
        updatePrice();
      }

  
      // let qtyValue = parseInt(qtyEl.value) || 0;
      // if (qtyValue > 1) {
      //   qtyValue -= 1;
      //   qtyEl.value = qtyValue;
      //   if (qtyValue <= 1) {
      //     minus.classList.add("disabled");
      //   }
      //   updatePrice();
      // }
    });

    plus.addEventListener('click', () => {
      let qtyValue = parseInt(qtyEl.value) || 0;
      qtyValue += 1;
      qtyEl.value = qtyValue;
      if (qtyValue > 1) {
        minus.classList.remove("disabled");
      }
      updatePrice();
    });

  });
};


export default QtyCalc;