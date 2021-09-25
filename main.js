function calculate() {
  let form = document.getElementById("form");

  // Pegando nome do formulário
  let countName = form.fullName.value;

  let vowelList = "aeiouAEIOU";
  let vcounter = 0;

  let consonantList = "bcdfghjklmnqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";
  let ccounter = 0;

  // Conta o número de vogais menos a última
  function sumVowels() {
    for (let i = 0; i < countName.length; i++) {
      if (vowelList.indexOf(countName[i]) !== -1) {
        vcounter += 1;
      }
    }
    return vcounter - 1;
  }

  let vowel = sumVowels();

  // Conta o número de consoantes somando com a última vogal
  function sumConsonants() {
    for (let i = 0; i < countName.length; i++) {
      if (consonantList.indexOf(countName[i]) !== -1) {
        ccounter += 1;
      }
    }
    return ccounter + 1;
  }
  let consonant = sumConsonants();

  // Soma o número de letras
  let sumLetters = vowel + consonant;

  // Pegando data do formulário
  let countDate = form.date.value;

  // Soma todos os números da data (ex.: [1+9+8+7] + [0+4] + [0+3])
  function sumDate() {
    let [year, month, day] = countDate.split("-");
    let sumYear = 0;
    let sumMonth = 0;
    let sumDay = 0;

    while (parseInt(year)) {
      sumYear += year % 10;
      year = Math.floor(year / 10);
    }

    while (parseInt(month)) {
      sumMonth += month % 10;
      month = Math.floor(month / 10);
    }

    while (parseInt(day)) {
      sumDay += day % 10;
      day = Math.floor(day / 10);
    }

    return sumYear + sumMonth + sumDay;
  }

  let resultDate = sumDate();

  // Soma o resultado das letras com o resultado da data de nascimento
  let finalResult = sumLetters + resultDate;

  const url = "./assets/orixas.json";

  // Comparar os resultados com a lista de orixás
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (vowel == data[i].numero) {
          document.querySelector(".orixa-vogal").innerHTML = data[i].nome;
        }
        if (consonant == data[i].numero) {
          document.querySelector(".orixa-consoante").innerHTML = data[i].nome;
        }
        if (sumLetters == data[i].numero) {
          document.querySelector(".orixa-letras").innerHTML = data[i].nome;
        }
        if (resultDate === data[i].numero) {
          document.querySelector(".orixa-nascimento").innerHTML = data[i].nome;
        }
        if (finalResult == data[i].numero) {
          document.querySelector(".orixa-final").innerHTML = data[i].nome;
        }
      }
    });
  // Exibe os resultados em tela

  document.querySelector(".totem-vogal").innerHTML = `Vogais ${vowel}`;
  document.querySelector(
    ".totem-consoante"
  ).innerHTML = `Consoantes ${consonant}`;
  document.querySelector(".letras").innerHTML = sumLetters;
  document.querySelector(".nascimento").innerHTML = resultDate;
  document.querySelector(".soma-final").innerHTML = finalResult;

  if (countName == 0 || countDate == 0){
    alert("Há campos em branco")
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  calculate();
});
