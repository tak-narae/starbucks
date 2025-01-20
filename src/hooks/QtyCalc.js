
const QtyCalc = () => {
  const spinners = document.querySelectorAll('.btn_qty');
  console.log(`.btn_qty 몇개 ??? ${spinners.length}`);

  if (spinners.length === 0) {
    console.warn(".btn_qty 없음");
    return;
  }

  spinners.forEach(spinner => {
    console.log("spinner===", spinner);
    const minus = spinner.querySelector('.minus');
    const plus = spinner.querySelector('.plus');
    const qtyEl = spinner.querySelector('.qty');
    
    
    if (parseInt(qtyEl.value) <= 1) {
      minus.classList.add("disabled");
    }
    
    const updatePrice = () => {
      if(document.querySelector("#container").classList.contains("prd__detail")){
        const totalPriceEl = spinner.closest('.total_item').querySelector('.total_price');
        const originPrice = parseInt(document.querySelector('[class^="prd__detail"] .prd_item .info_cont .price').textContent.replaceAll(',', ''));
        console.log(originPrice, "*" ,qtyEl.value, "=" ,totalPriceEl.textContent);
        totalPriceEl.textContent = (originPrice * qtyEl.value).toLocaleString(1) + "원";
      } 
      if(document.querySelector("#container").classList.contains("order__cart")){
        console.log("CART_PLUS")
      }
    }

    minus.addEventListener('click', () => {
      let qtyValue = parseInt(qtyEl.value) || 0;
      if (qtyValue > 1) {
        qtyValue -= 1;
        qtyEl.value = qtyValue;
        if (qtyValue <= 1) {
          minus.classList.add("disabled");
        }
        updatePrice();
      }
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