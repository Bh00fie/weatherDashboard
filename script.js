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
})};