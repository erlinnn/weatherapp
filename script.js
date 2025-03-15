const weatherApiKey = "32647dfe3600b04381e9560af76464c9"; // OpenWeatherMap API Key
const unsplashApiKey = "47br5Bn2eoFnFeTJGfs-1wOuch3rUpHlD1lbHEIubRQ"; // Unsplash API Key
const weatherDiv = document.getElementById("weather");

// Function to fetch weather data
async function getWeather() {
    const city = document.getElementById("city").value.trim(); // Get city input

    if (city === "") {
        weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            updateBackground(city); // Update background with Unsplash API

            weatherDiv.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>🌡️ Temperature: ${data.main.temp}°C</p>
                <p>☁️ Condition: ${data.weather[0].description}</p>
                <p>💨 Humidity: ${data.main.humidity}%</p>
                <p>🌍 Wind Speed: ${data.wind.speed} m/s</p>
            `;
        } else {
            weatherDiv.innerHTML = "<p>❌ City not found! Please try again.</p>";
        }
    } catch (error) {
        weatherDiv.innerHTML = "<p>⚠️ Error fetching data. Check your internet connection.</p>";
        console.error("Error fetching weather:", error);
    }
}

// Function to update background using Unsplash API
async function updateBackground(city) {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashApiKey}`);
        const data = await response.json();

        if (data.urls && data.urls.full) {
            document.body.style.backgroundImage = `url('${data.urls.full}')`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = "background 0.5s ease-in-out";
        }
    } catch (error) {
        console.error("Error fetching background image:", error);
    }
}
