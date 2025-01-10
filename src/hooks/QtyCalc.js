const QtyCalc = () => {
  const spinners = document.querySelectorAll('.btn_qty');
  console.log(`.btn_qty 요소 수: ${spinners.length}`);

  if (spinners.length === 0) {
    console.warn(".btn_qty 요소를 찾을 수 없습니다.");
    return;
  }

  spinners.forEach(spinner => {
    console.log("spinner===", spinner);
    const minus = spinner.querySelector('.minus');
    const plus = spinner.querySelector('.plus');
    const qtyEl = spinner.querySelector('.qty');
    const originPrice = parseInt(document.querySelector('[class^="prd__detail"] .prd_item .info_cont .price').textContent.replaceAll(',', ''), 10);
    const totalPriceEl = spinner.closest('.total_item').querySelector('.total_price');


    if (parseInt(qtyEl.value) <= 1) {
      minus.classList.add("disabled");
    }

    const updatePrice = () => {
      console.log("원래가격==", originPrice);
      console.log("최종가격==", totalPriceEl);
      console.log("수량==", qtyEl.value);
      totalPriceEl.textContent = (originPrice * qtyEl.value).toLocaleString(1) + "원";
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