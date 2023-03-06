// Defined Variables containing classes and ids from HTML
const searchForm = $('#search-form');
const searchInput = $('#search-input');
const searchBtn = $('#search-button');
const historyList = $('#history');
const forecastHead = $('#forecast-header');
const forecastList = $('#forecast').empty();
const todayHead = $('#current-header');
const todayWeather = $('#today').empty();
const cityArray = [];

// Defined API key
const apiKey = '5db739fbbf70439b82102c73fb943ced';

// Get City Weather using OpenWeatherAPI
let weatherSearch = (cityName) => {
    console.log(cityName);
    let weathertUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    $.ajax({
        url: weathertUrl,
        method: "GET"
      }).then(function(response) {
        console.log(response);

    // Define CURRENT weather element
    const todayHeader = $("<h2 class='mt-1 h3 form-label font-effect-outline'>").text("Today Weather");
    const dateFormat = moment().format("LL");
    const currentCity = $(`<h2 class='ml-2'>${response.name}</h2>`);
    const currentDate = $(`<h3 class='ml-2'>Date: ${dateFormat}</h3>`);
    const currentTemp = $(`<p class='ml-2'>Current Temperature: ${Math.round(response.main.temp-273.15)} °C</p>`);
    const currentHumidity = $(`<p class='ml-2'>Current Humidity: ${response.main.humidity} %</p>`);
    const currentWindSpeed = $(`<p class='ml-2'>Current Wind Speed: ${response.wind.speed} meter/sec</p>`);

    // Update Icon according to the weather
    const weatherIconMap = {
        "Rain": "09d",
        "Clouds": "04d",
        "Clear": "01d",
        "Drizzle": "10d",
        "Snow": "13d"
    };

    // Icon Styling
    const currentWeather = response.weather[0].main;
    const iconCode = weatherIconMap[currentWeather];
    const currentIcon = $('<img>').attr({
      "src": `http://openweathermap.org/img/wn/${iconCode}.png`,
      "style": "height: 60px; width: 60px"
    });

    // Appending all information to main card
    const currentWeatherSection = $('<section>').append(
        currentCity,
        currentIcon,
        currentDate,
        currentTemp,
        currentHumidity,
        currentWindSpeed
      );
      
    todayHead.append(todayHeader);
    todayWeather.addClass("border").html(currentWeatherSection);
});

    // Get next 5 days forecast by OpenWeatherAPI
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
    $.ajax({
        url: forecastUrl,
        method: "GET",
    }).then(function(responseForecast){
        console.log(responseForecast);

    // Create cards for forecast
    let forecastCard;
    let forecastHeader = $("<h2 class='mt-1 h3 form-label font-effect-outline'>").text("5 days forecast")

    for (let i = 2; i < responseForecast.list.length; i += 8) {
    forecastCard = $("<section class='card card-styling mb-3 mx-auto col-2'>")
    let forecastDate = $("<p class='card-text' style='font-weight: 600; text-align: center'>").text(responseForecast.list[i].dt_txt.substr(0,10));
    const forecastTemp = $("<p class='card-text'>").text("Temp: " + Math.round(responseForecast.list[i].main.temp-273.15)+ " °C");
    const forecastHumidity = $("<p class='card-text'>").text("Humidity: " + responseForecast.list[i].main.humidity + " %");
    const forecastWind = $("<p class='card-text'>").text("Wind: " +responseForecast.list[i].wind.speed + " m/s");

    // Update Icon according to the forecast
    const weatherIconMap = {
        "Rain": "09d",
        "Clouds": "04d",
        "Clear": "01d",
        "Drizzle": "10d",
        "Snow": "13d"
        };

    // Icon Styling
    const forecastWeather = responseForecast.list[i].weather[0].main;
    const iconCode = weatherIconMap[forecastWeather];
    const forecastIcon = $('<img>').attr({
        "src": `http://openweathermap.org/img/wn/${iconCode}.png`,
        "style": "height: 60px; width: 60px"
    }); 
    
    // Appending all information to each card
    forecastHead.append(forecastHeader);
    forecastList.append(forecastCard);
    forecastCard.append(forecastDate, forecastIcon, forecastTemp, forecastHumidity, forecastWind);
    }
});
};


// Function to search for a city
let citySearch = () => {
    let cityName = searchInput.val().trim();
    cityArray.push(cityName);
    if (cityName === '') {
        return;
      }
    // Store search history to search list
    localStorage.setItem('cityName', JSON.stringify(cityArray));
    weatherSearch(cityName);
    appendSearch();
    searchInput.val(''); // Clear the input field
};