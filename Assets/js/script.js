$(document).ready(function () {

// Open the page: get history city history from local storage
    // list the all previous serached cities on the page (8 cities)
        // search the array if the city is already there before display, so don't display the same city twice
    // get the last searched item (last item of the array) and run the API on that one

// click event for the city history cities (a TAG), search for the city

// Input to Search for a city
// search button
    // request API current weather data from https://openweathermap.org/api
    // make sure to clear the page after search
    // Local storage: if not in the city list and restore the array back in local storage

// search results beside the page
    // get the date with moment.js and display the date (opt to use javascript)
        let currentDate = moment().format("L");

    // icon with the weather
    // weather conditions for that city
    // temperature
    // humidity
    // wind speed
    // UV index (display colors: favorable, moderate, severe) (diff API call)

// request API for 5 day forecast

// tip: separate in functions request API, 



function getUvIndex() {
    // var myCity = city; //atlanta
    let latitude = 37.75;
    let longitude = -122.37;

    $.ajax({
        url: `http://api.openweathermap.org/data/2.5/uvi?appid=a9fa8e4a5cdb9ab82f25d7a62cad4dc7&lat=${latitude}&lon=${longitude}`,
        type: "GET",
    }).then(function(response) {
        console.log(response);
        
    })
}
getUvIndex();


function getWeather(){
    let searchCity = "London";
    // let latitude = response.coord.lat;
    // let longitude = response.coord.lon;

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=a9fa8e4a5cdb9ab82f25d7a62cad4dc7`,
        type: "GET",

    }).then(function(response) {
        console.log(response);

        let $cityName = $("<span>").attr("id", "weather-header").text(response.name);
        let $dateDisplay = $("<span>").text(currentDate);
        let $weatherIcon = $("<img>").attr("id", "weather-icon").attr("src",
        "https://openweathermap.org/img/w/" +
        response.weather[0].icon +
        ".png");
        let $temperature = $("<p>").text(`Temperature: ${response.main.temp} F`);
        let $humidity = $("<p>").text(`Humidity: ${response.main.humidity} "%"`);
        let $windSpeed = $("<p>").text(`Wind Speed: ${response.wind.speed} MPH`);
        $(".card-header").append(
            $cityName,
            $dateDisplay,
            $weatherIcon,
            $temperature,
            $humidity,
            $windSpeed
        );
    })

    // getUvIndex(latitude, longitude);
}
getWeather();

function weatherForecast() {
    let searchCity = "London";

    $.ajax({
        url: `api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=a9fa8e4a5cdb9ab82f25d7a62cad4dc7`,
        type: "GET",

    }).then(function(response) {
        console.log(response);

    })
}
weatherForecast();

});