function formatDate(timestamp) {
  let date=new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast=response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay,index) {
    if (index<6){
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
            <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="40"/>
            <div class="forecast-temperatures">
              <span class="forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
              </div>
                </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "63214c4281922e3bb72fdf12dada7734";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);

function showTemperature(response) {
 let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let qualityElement = document.querySelector("#quality");
  qualityElement.innerHTML = response.data.weather[0].main;
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  let humidityElement = document.querySelector("#Humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let pressureElement = document.querySelector("#Pressure");
  pressureElement.innerHTML = response.data.main.pressure;
  let feelElement = document.querySelector("#feels");
  feelElement.innerHTML = response.data.main.feels_like;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

  function search(city) {
  let apiKey = "dbef7eeb3a0ddc2629b78a3a723c1c37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
  
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
   search(cityInputElement.value);
  }

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let apiKey = "dbef7eeb3a0ddc2629b78a3a723c1c37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

search("Paris");
