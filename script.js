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

})}