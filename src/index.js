function convertFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = 63;
}

function convertCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = 17;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

function showWeather(response) {
  let city = response.data.name;
  let temperature = document.querySelector("#temp");
  let h1 = document.querySelector("#city");

  temperature.innerHTML = Math.round(response.data.main.temp);
  h1.innerHTML = response.data.name;

  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

function retrieveWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);

  navigator.geolocation.getCurrentPosition(retrieveWeather);
}

function searchCity(city) {
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(retrieveWeather);
}

let now = new Date();

let h3 = document.querySelector("h3");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let currentLocationButton = document.querySelector(".current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsius);

h3.innerHTML = `${day} ${hours}:${minutes}`;
