let apiKey = "a9b525cfaeea4a0447315d17428bd246";
let searchButton = document.querySelector("#Search-button");
let cityNameElement = document.querySelector("#city-name");
let temperatureElement = document.querySelector("#temperature");
let windElement = document.querySelector("#wind");
let precipitationElement = document.querySelector("#precipitation");
let weatherDescriptionElement = document.querySelector("#weather-description");
let humidityElement = document.querySelector("#humidity");

function getWeatherData(cityName, apiKey, callback) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  function handleResponse(response) {
    let weatherData = {
      cityName: cityName,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      precipitation: response.data.rain
        ? response.data.rain["1h"] || "0mm"
        : "0mm",
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
    };
    callback(null, weatherData);
  }

  function handleError(error) {
    callback(
      `Failed to fetch weather data for ${cityName}. Please try again later.`,
      null
    );
  }

  axios
    .get(apiUrl)
    .then(function (response) {
      handleResponse(response);
    })
    .catch(function (error) {
      handleError(error);
    });
}

function updateWeatherUI(weatherData) {
  cityNameElement.textContent = weatherData.cityName;
  temperatureElement.textContent = `${weatherData.temperature}°C`;
  windElement.textContent = `${weatherData.wind} km/h`;
  weatherDescriptionElement.textContent = weatherData.description;
  precipitationElement.textContent = weatherData.precipitation;
  humidityElement.textContent = `${weatherData.humidity}%`;
}

function getWeather(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#searchExample");
  let cityName = searchInput.value.trim();

  if (cityName === "") {
    alert("Please enter a city name.");
    return false;
  }

  getWeatherData(cityName, apiKey, function (error, weatherData) {
    if (error) {
      alert(error);
    } else {
      updateWeatherUI(weatherData);
    }
  });

  return false;
}

searchButton.addEventListener("click", getWeather);
