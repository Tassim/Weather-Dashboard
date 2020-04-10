$(document).ready(function () {

// global variable
let cityArray = JSON.parse(localStorage.getItem("city")) || [];
// get the date with moment.js and display the date (opt to use javascript)
let currentDate = moment().format("L");

// Open the page: get history city history from local storage
    // list the all previous serached cities on the page (8 cities)
function getCityHistory() {
    if(cityArray.length > 0){
        for (let i = 0; i < cityArray.length; i++) {
            addCitytoPage(cityArray[i]);
            showWeather(cityArray[i]);
        }
    }
}

function addCitytoPage(city){
    $divSearch = $("<div>").addClass("list-group");
    $divSearchItem = $("<div>").addClass("list-group-item");
    $listSearchBtn = $("<button>").addClass("previousSearchBtn btn btn-light btn-block").attr("data-index", city).text(city);
    $divSearchItem.append($listSearchBtn);
    $("#lastSearches").append($divSearch);
    $divSearch.append($divSearchItem);

    // click event for the city history cities, search for the city
    $(".previousSearchBtn").on("click", function(e) {
        e.preventDefault();

        let clickedBtn = $(this).find('[data-index]').attr('data-index');
        console.log(clickedBtn);

        // showWeather(clickedBtn);
        // let lastItem = cityArray[cityArray.length -1];
        // console.log(lastItem);
    })
}

function showWeather(city){
    getWeather(city);
    weatherForecast(city);
    $("#weatherDisplay").show();
}
    // Local storage: if not in the city list and restore the array back in local storage
function storeCity() {
    localStorage.setItem("city", JSON.stringify(cityArray));
}
// search results beside the page

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
        let $dateDisplay = $("<span>").attr("id", "weather-header").text("  (" + currentDate + ")");
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
        $("#fiveDayForecast").empty();
        for (let i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.indexOf("18:00:00") !== -1) {
                let $formattedDate = moment(response.list[i].dt_txt).format("L");
                let $5dayDiv = $("<div>").addClass('card bg-primary mb-3 text-white').attr("id", "fiveDayCard");
                let $fiveDayDate = $("<div>").text($formattedDate);
                let $fiveDayIcon = $("<img>").attr("id", "weather-icon-sm").attr(
                    "src",
                    "https://openweathermap.org/img/w/" +
                    response.list[i].weather[0].icon +
                    ".png"
                  );
                let $fiveDayTemp = $("<p>").attr("id", "weather-description").text(`Temp: ${response.list[i].main.temp} °F`);
                let $fiveDayHumidity = $("<p>").attr("id", "weather-description").text(`Humidity: ${response.list[i].main.humidity} %`);
                $("#fiveDayForecast").append($5dayDiv);
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

$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    
    let searchCity = $("#locationSearched").val().trim();
    if(searchCity === ""){
        return
    }

    // search the array if the city is already there before display, so don't display the same city twice
        // get the last searched item (last item of the array) and run the API on that one
    if(cityArray.indexOf(searchCity) === -1) {
        cityArray.push(searchCity);
        storeCity();
        addCitytoPage(searchCity);
    }
    // make sure to clear the page after search
    $("#locationSearched").val("");
    showWeather(searchCity);
})

$("#weatherDisplay").hide();

getCityHistory();

});
