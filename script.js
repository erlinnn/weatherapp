const apiKey = "32647dfe3600b04381e9560af76464c9"; // OpenWeatherMap API
const unsplashApiKey = "47br5Bn2eoFnFeTJGfs-1wOuch3rUpHlD1lbHEIubRQ"; // Unsplash API
const weatherDiv = document.getElementById("weather");

// Fun facts about weather
const funFacts = [
    "Lightning is five times hotter than the surface of the sun!",
    "Antarctica is the driest, coldest, and windiest continent on Earth.",
    "Raindrops can be as small as 0.02 inches or as big as 0.33 inches.",
    "Snowflakes can take up to an hour to fall from the cloud to the ground.",
    "The coldest temperature ever recorded on Earth was -128.6°F (-89.2°C) in Antarctica."
];

// Function to update the time in 12-hour format
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("time").innerText = `${hours}:${minutes} ${ampm}`;
}
setInterval(updateTime, 1000);
updateTime();

// Function to fetch weather details
async function getWeather() {
    const city = document.getElementById("city").value.trim();

    if (city === "") {
        weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod === 200) {
            const weatherCondition = weatherData.weather[0].description.toLowerCase();

            // Fetch background image from Unsplash
            await updateBackground(city);

            weatherDiv.innerHTML = `
                <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
                <p>🌡️ Temperature: ${weatherData.main.temp}°C</p>
                <p>☁️ Condition: ${weatherCondition}</p>
                <p>💨 Humidity: ${weatherData.main.humidity}%</p>
            `;

            // Hide fun facts and global weather updates
            document.querySelector(".extras").style.display = "none";
        } else {
            weatherDiv.innerHTML = "<p>❌ City not found! Please try again.</p>";
        }
    } catch (error) {
        weatherDiv.innerHTML = "<p>⚠️ Error fetching data. Check your internet connection.</p>";
        console.error("Error fetching weather:", error);
    }
}

// Function to change background image based on the city
async function updateBackground(city) {
    try {
        const unsplashUrl = `https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashApiKey}`;
        const unsplashResponse = await fetch(unsplashUrl);
        const unsplashData = await unsplashResponse.json();

        if (unsplashData.urls && unsplashData.urls.regular) {
            document.body.style.backgroundImage = `url('${unsplashData.urls.regular}')`;
        }
    } catch (error) {
        console.error("Error fetching Unsplash image:", error);
    }
}

// Function to fetch global weather updates
async function getGlobalWeather() {
    const cities = ["New York", "London", "Tokyo", "Sydney", "Dubai"];
    let updates = "";

    for (const city of cities) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.cod === 200) {
                updates += `<p>🌍 ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}</p>`;
            }
        } catch (error) {
            console.error(`Error fetching weather for ${city}:`, error);
        }
    }
    document.getElementById("globalWeather").innerHTML = updates;
}
getGlobalWeather();

// Show a random fun fact
document.getElementById("funFact").innerText = funFacts[Math.floor(Math.random() * funFacts.length)];
