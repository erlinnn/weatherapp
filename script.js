const weatherApiKey = "32647dfe3600b04381e9560af76464c9"; // OpenWeatherMap API Key
const unsplashApiKey = "47br5Bn2eoFnFeTJGfs-1wOuch3rUpHlD1lbHEIubRQ"; // Unsplash API Key
const weatherDiv = document.getElementById("weather");
const timeDiv = document.getElementById("time");
const factDiv = document.getElementById("fact");
const globalWeatherDiv = document.getElementById("globalWeather");

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

// Function to show live time in 12-hour format
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    timeDiv.innerHTML = `<p>⏰ Current Time: ${hours}:${minutes} ${amPm}</p>`;
}
setInterval(updateTime, 1000);
updateTime();

// Function to display random fun weather facts
const funFacts = [
    "🌪️ The fastest wind speed ever recorded on Earth was 253 mph during a tornado.",
    "🌡️ Antarctica is the coldest place on Earth, reaching -128.6°F (-89.2°C).",
    "☔ The wettest place on Earth is Mawsynram, India, receiving 467 inches of rain per year!",
    "⚡ Lightning strikes the Earth about 100 times per second!",
    "🌊 The highest recorded ocean wave was 112 feet during a typhoon.",
    "❄️ The largest snowflake ever recorded was 15 inches wide!"
];

function showRandomFact() {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    factDiv.innerHTML = `<p>💡 Fun Fact: ${funFacts[randomIndex]}</p>`;
}
setInterval(showRandomFact, 10000);
showRandomFact();

// Function to fetch global weather updates
async function getGlobalWeatherUpdates() {
    const cities = ["New York", "London", "Tokyo", "Sydney", "Dubai"];
    globalWeatherDiv.innerHTML = "<h3>🌍 Global Weather Updates</h3>";

    for (const city of cities) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`);
            const data = await response.json();

            if (data.cod === 200) {
                globalWeatherDiv.innerHTML += `
                    <p>📍 ${city}: ${data.main.temp}°C, ${data.weather[0].description}</p>
                `;
            }
        } catch (error) {
            console.error(`Error fetching weather for ${city}:`, error);
        }
    }
}
getGlobalWeatherUpdates();
setInterval(getGlobalWeatherUpdates, 60000); // Refresh every 60 seconds
