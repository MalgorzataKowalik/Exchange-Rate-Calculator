const currencyElOne = document.getElementById('currency-one');
const currencyElTwo = document.getElementById('currency-two');
const amountElOne = document.getElementById('amount-one');
const amountElTwo = document.getElementById('amount-two');

const rateEl = document.querySelector('.rate p');
const swapBtn = document.querySelector('.rate button')


// fetch exchange rates and update the DOM


function calculate() {
  const currOne = currencyElOne.value;
  const currTwo = currencyElTwo.value;
  const amountOne = Number(amountElOne.value);

  fetch(`https://v6.exchangerate-api.com/v6/ecfec4e9e6a039e921ef2be8/latest/${currOne}`)
    .then(res => res.json())
    .then(data => {
      const rate = Number(data.conversion_rates[currTwo]);
      rateEl.textContent = `1 ${currOne} = ${rate} ${currTwo}`;
      amountElTwo.value = (amountOne * rate).toFixed(2);
    })
}

function swapCurrencies() {
  const currOne = currencyElOne.value;
  const currTwo = currencyElTwo.value;
  currencyElOne.value = currTwo;
  currencyElTwo.value = currOne;
  calculate();
}


// event listeners

currencyElOne.addEventListener('change', calculate);
currencyElTwo.addEventListener('change', calculate);
amountElOne.addEventListener('input', calculate);
amountElTwo.addEventListener('input', calculate);
swapBtn.addEventListener('click', swapCurrencies)



calculate();

