$(document).ready(function () {

// global variable
let searchedCity = [];

console.log(searchedCity);

// Open the page: get history city history from local storage
    // list the all previous serached cities on the page (8 cities)
function getCityHistory(searchCity) {
    let cityStored = localStorage.setItem("city", searchCity);

    for (let i = 0; i < 9; i++) {
        $divSearch = $("<div>").addClass("list-group");
        $divSearchItem = $("<div>").addClass("list-group-item");
        $aSearch = $("<a>").attr("src", `https://openweathermap.org/find?q=${cityStored}`).text(cityStored);
        $divSearchItem.append($aSearch);
        $("#lastSearches").append($divSearch);
        $divSearch.append($divSearchItem);
    }
}
getCityHistory();
   

        // search the array if the city is already there before display, so don't display the same city twice
    // get the last searched item (last item of the array) and run the API on that one

// click event for the city history cities (a TAG), search for the city


// Input to Search for a city
// search button
$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    
    let searchCity = $("#locationSearched").val().trim();   
    searchedCity.push(searchCity);

    // make sure to clear the page after search
    $("#locationSearched").val("");
    
    storeCity(searchCity);
    getWeather(searchCity);
    weatherForecast(searchCity);

})

    // Local storage: if not in the city list and restore the array back in local storage
function storeCity(searchCity) {
    localStorage.setItem("city", JSON.stringify(searchCity));
}

// search results beside the page
    // get the date with moment.js and display the date (opt to use javascript)
        let currentDate = moment().format("L");

    // api request from https://openweathermap.org/api for current weather
function getWeather(searchCity) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=a9fa8e4a5cdb9ab82f25d7a62cad4dc7`,
        type: "GET",

    }).then(function(response) {
        $("#currentDay").empty();
        let latitude = response.coord.lat;
        let longitude = response.coord.lon;
         // weather conditions for that city
        let $cityName = $("<span>").attr("id", "weather-header").text(response.name);
        let $dateDisplay = $("<span>").text("  (" + currentDate + ")");
         // icon with the weather
        let $weatherIcon = $("<img>").attr("id", "weather-icon").attr("src",
        "https://openweathermap.org/img/w/" +
        response.weather[0].icon +
        ".png");
        // temperature
        let $temperature = $("<p>").text(`Temperature: ${response.main.temp} F`);
        // humidity
        let $humidity = $("<p>").text(`Humidity: ${response.main.humidity} %`);
        // wind speed
        let $windSpeed = $("<p>").text(`Wind Speed: ${response.wind.speed} MPH`);
        $("#currentDay").append(
            $cityName,
            $dateDisplay,
            $weatherIcon,
            $temperature,
            $humidity,
            $windSpeed
        );
        getUvIndex(latitude, longitude);
    })
}


    // UV index (display colors: favorable, moderate, severe) (diff API call)
function getUvIndex(latitude, longitude) {
    $.ajax({
        url: `http://api.openweathermap.org/data/2.5/uvi?appid=a9fa8e4a5cdb9ab82f25d7a62cad4dc7&lat=${latitude}&lon=${longitude}`,
        type: "GET",
    }).then(function(response) {
        $("currentDay").empty();

        let uvIndex = $("<p>").attr("id", "uvIndex").text(`UV Index: ${response.value}`);
        $('#currentDay').append(uvIndex);
    })
}

// request API for 5 day forecast
function weatherForecast(searchCity) {
    // api request from https://openweathermap.org/api
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=b1f75a8345ad82bd38c14fa22705dcd2`,
        type: "GET",

    }).then(function(response) {
        $("#5dayForecast").empty();
        for (let i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.indexOf("18:00:00") !== -1) {
                let $formattedDate = moment(response.list[i].dt_txt).format("L");
                let $5dayDiv = $("<div>").addClass('card bg-light mb-3').attr("id", "fiveDayCard");
                let $fiveDayDate = $("<div>").text($formattedDate);
                let $fiveDayIcon = $("<img>").attr("id", "weather-icon-sm").attr(
                    "src",
                    "https://openweathermap.org/img/w/" +
                    response.list[i].weather[0].icon +
                    ".png"
                  );
                let $fiveDayTemp = $("<p>").attr("id", "weather-description").text(`Temp: ${response.list[i].main.temp} °F`);
                let $fiveDayHumidity = $("<p>").attr("id", "weather-description").text(`Humidity: ${response.list[i].main.humidity} %`);
                $("#5dayForecast").append($5dayDiv);
                    $5dayDiv.append(
                    $fiveDayDate,
                    $fiveDayIcon,
                    $fiveDayTemp,
                    $fiveDayHumidity
                )
            }   
        }
    })
}



});