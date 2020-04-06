
// Open the page
// request API current weather data from https://openweathermap.org/api
// Input to Search for a city
// search button
// 8 cities display list link below the search
// search results beside the page
    // icon with the weather
    // weather conditions for that city
    // temperature
    // humidity
    // wind speed
    // UV index (display colors: favorable, moderate, severe)
// request API for 5 day forecast
// open the weather dashoard see the last searched city


function weather(){
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=London&appid=a9fa8e4a5cdb9ab82f25d7a62cad4dc7`,
        type: "GET",

    }).then(function(response) {
        
    console.log(response);

    })

}