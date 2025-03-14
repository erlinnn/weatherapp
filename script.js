const apiKey = "32647dfe3600b04381e9560af76464c9";  // Replace with your actual API key
const weatherDiv = document.getElementById("weather");
const cityName = document.getElementById("city-name");
const tempDisplay = document.getElementById("temperature");
const conditionDisplay = document.getElementById("condition");
const weatherIcon = document.getElementById("weather-icon");
const convertBtn = document.getElementById("convert-btn");

let isCelsius = true;

async function getWeather() {
    const city = document.getElementById("city").value.trim();

    if (city === "") {
        weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            // Get weather condition
            const weatherCondition = data.weather[0].description.toLowerCase();
            const temp = data.main.temp;
            const iconCode = data.weather[0].icon;
            
            // Update Background Image & Effects
            updateBackground(weatherCondition);

            // Display Weather Info
            cityName.innerHTML = `${data.name}, ${data.sys.country}`;
            tempDisplay.innerHTML = `🌡️ ${temp}°C`;
            conditionDisplay.innerHTML = `☁️ ${data.weather[0].description}`;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;

            weatherDiv.style.display = "block";
        } else {
            weatherDiv.innerHTML = "<p>❌ City not found! Please try again.</p>";
        }
    } catch (error) {
        weatherDiv.innerHTML = "<p>⚠️ Error fetching data. Check your internet connection.</p>";
        console.error("Error fetching weather:", error);
    }
}

// Function to change background image & animations
function updateBackground(condition) {
    const body = document.body;
    const snowfall = document.querySelector(".snowfall");

    if (condition.includes("clear")) {
        body.style.backgroundImage = "url('images/sunny.jpg')";
        snowfall.style.display = "none";
    } else if (condition.includes("cloud")) {
        body.style.backgroundImage = "url('images/cloudy.jpg')";
        snowfall.style.display = "none";
    } else if (condition.includes("rain")) {
        body.style.backgroundImage = "url('images/rainy.jpg')";
        snowfall.style.display = "none";
    } else if (condition.includes("thunderstorm")) {
        body.style.backgroundImage = "url('images/storm.jpg')";
        snowfall.style.display = "none";
    } else if (condition.includes("snow") || condition.includes("flurries") || condition.includes("blizzard")) { 
        body.style.backgroundImage = "url('images/snow.jpg')";
        snowfall.style.display = "block";  // Show snowfall effect
    } else {
        body.style.backgroundImage = "url('images/default.jpg')";
        snowfall.style.display = "none";
    }
}

// Toggle Temperature Unit (Celsius/Fahrenheit)
convertBtn.addEventListener("click", function() {
    let currentTemp = parseFloat(tempDisplay.innerHTML.match(/[-]?\d+(\.\d+)?/)[0]);

    if (isCelsius) {
        let fahrenheit = (currentTemp * 9/5) + 32;
        tempDisplay.innerHTML = `🌡️ ${fahrenheit.toFixed(1)}°F`;
        convertBtn.innerHTML = "Switch to °C";
    } else {
        let celsius = (currentTemp - 32) * 5/9;
        tempDisplay.innerHTML = `🌡️ ${celsius.toFixed(1)}°C`;
        convertBtn.innerHTML = "Switch to °F";
    }

    isCelsius = !isCelsius;
});
