'use strict'

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const API_KEY = "ab6cadfa2c566b17189d2a4ac5af4f12";
const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".input-city");
const searchBtn = document.querySelector(".btn1");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(URL + city + `&appid=${API_KEY}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
    } else {
        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp-heading").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".speed").innerHTML = "Wind Speed : " + data.wind.speed + " km/h";
        document.querySelector(".humidity").innerHTML = "Humidity : " + data.main.humidity + "%";
        document.querySelector(".fahrenheit").innerHTML = "Fahrenheit : " + Math.round(((data.main.temp) * 9 / 5) + 32) + "°F";
        document.querySelector(".weater-info").innerHTML = data.weather[0].main;

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/cloud.jpg";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/clear.jpg";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/rain1.jpg";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "img/drizzle.jpg";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "img/mist.jpg";
        }
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

$(function() {
    var availableTags = [
        "mumbai",
        "paris",
        "delhi",
        "pune",
        "hyderabad",
        "kalyan",
        "agra",
        "chennai",
        "kolkata",
        "surat",
        "new york",
        "london",
        "tokyo",
        "bangkok",
        "dubai",
        "rome",
        "berlin",
        "moscow",
        "ulhasnagar",
        "manali",
        "miami",
        "lucknow"
    ];
    $("#tags").autocomplete({
        source: availableTags
    });
});