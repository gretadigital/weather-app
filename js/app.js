const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {
  // Destructure the Properties from the Data Object:
  const { cityDetails, weather } = data;

  // Update Details Template:
  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Imperial.Value}</span>
      <span>&deg;F</span>
    </div>
    `;

  // Update the Night/Day and Icon Images:
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  time.setAttribute('src', timeSrc);

  // Remove the d-none Class if Present:
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

cityForm.addEventListener('submit', (e) => {
  // Prevent the Default Action:
  e.preventDefault();

  // Get the City Value:
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // Update the UI with the new City data:
  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  // Set Local Storage:
  localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
  forecast
    .updateCity(localStorage.getItem('city'))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
