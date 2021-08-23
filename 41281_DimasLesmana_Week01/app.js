const btnCalculate = document.getElementById('calculate-btn');
const btnReset = document.getElementById('reset-btn')
const inputHeight = document.getElementById('height-input');
const inputWeight = document.getElementById('weight-input');
const bmiResult = document.getElementById('bmi-result');
const bmiCategory = document.getElementById('bmi-category');
const resultCard = document.querySelector('ion-card');

const card = type => {
  switch (type) {
    case 'show':
      resultCard.classList.remove('ion-hide');
      break;
    case 'hide':
      resultCard.classList.add('ion-hide');
      break;
  }
};

const reset = () => {
  inputHeight.value = "";
  inputWeight.value = "";
  card('hide');
};

const calculateBMI = () => {
  const height = +inputHeight.value / 100;
  const weight = +inputWeight.value;

  if (!height || !weight) return;

  const bmi = weight / (height * height);
  bmiResult.innerHTML = bmi;

  if (bmi >= 18.5 && bmi <= 24.9) {
    bmiCategory.innerHTML = "Normal";
  } else if (bmi >= 25 && bmi <= 29.9) {
    bmiCategory.innerHTML = "Gemuk";
  } else if (bmi < 18.5) {
    bmiCategory.innerHTML = "Kurus";
  } else if (bmi >= 30) {
    bmiCategory.innerHTML = "Obesitas";
  }

  card('show');
  console.log(bmi);
};

btnCalculate.addEventListener('click', calculateBMI);
btnReset.addEventListener('click', reset);