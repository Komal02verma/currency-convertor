const droplist = document.querySelectorAll(".drop-list select");

fromCurrency = document.querySelector(".from select")

toCurrency = document.querySelector(".to select")

const getButton = document.querySelector("form button");

for (let i = 0; i < droplist.length; i++) {
    for (let currency_code in countries) {
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        } else if (i == 1) {
            selected = currency_code == "INR" ? "selected" : "";
        }

        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        droplist[i].insertAdjacentHTML("beforeend", optionTag);
    }

    droplist[i].addEventListener("change", e => {
        loadFlag(e.target);
    })
}

function loadFlag(element) {
    for (code in countries) {
        if (code === element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${countries[code]}/flat/64.png`
        }
    }
}

window.addEventListener("load", () => {
    getExchangeRate();
});

getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency)
    loadFlag(toCurrency)
    getExchangeRate();
})


function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    const exchangeRateTxt = document.querySelector(".exchange-rate");

    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }

    exchangeRateTxt.innerText = "Getting exchange rate...";


    // Add your exchange rate logic here
    // console.log("Exchange rate calculation logic here...");
    let url = ` https://v6.exchangerate-api.com/v6/88293c98bab288a4281478d6/latest/${fromCurrency.value}`

    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value} `;
    })
        .catch(() => {
            exchangeRateTxt.innerText = "Something went wrong..."
        })
}