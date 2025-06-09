const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");

const currencyName = document.querySelector(".currency-name");
const currencyImg = document.querySelector(".currency-img");

async function convertValues() {
  const inputCurrencyElement = document.querySelector(".input-currency");
  const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
  const currencyValueConverted = document.querySelector(".currency-value");

  const targetCurrency = currencySelect.value;
  const rawInput = inputCurrencyElement.value;

  const numericValue = Number(
    rawInput
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()
  );

  if (isNaN(numericValue)) {
    alert("Digite um valor válido!");
    return;
  }

  try {
    const url = `https://economia.awesomeapi.com.br/json/last/BRL-${targetCurrency}`;
    const response = await fetch(url);
    const data = await response.json();
    const exchangeRate = Number(data[`BRL${targetCurrency}`].bid);

    const convertedValue = numericValue * exchangeRate;

    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numericValue);

    currencyValueConverted.innerHTML = new Intl.NumberFormat(
      targetCurrency === "USD" ? "en-US" : "de-DE",
      {
        style: "currency",
        currency: targetCurrency,
      }
    ).format(convertedValue);
  } catch (error) {
    alert("Erro ao buscar a cotação. Tente novamente.");
    console.error(error);
  }
}

function changeCurrency() {
  const selected = currencySelect.value;

  if (selected === "USD") {
    currencyName.innerHTML = "Dólar";
    currencyImg.src = "./assets/Dolar.png";
  } else if (selected === "EUR") {
    currencyName.innerHTML = "Euro";
    currencyImg.src = "./assets/Euro.png";
  }

  convertValues();
}

convertButton.addEventListener("click", convertValues);
currencySelect.addEventListener("change", changeCurrency);
