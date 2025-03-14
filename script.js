const apiKey = "32647dfe3600b04381e9560af76464c9"; // Replace with your OpenWeatherMap API key
const weatherDiv = document.getElementById("weather");
const loadingDiv = document.getElementById("loading");

// Function to update live time (12-hour format)
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 24-hour format to 12-hour
    document.getElementById("time").textContent = `🕒 ${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}
setInterval(updateTime, 1000);
updateTime(); // Run immediately

// Fun facts about weather & places
const facts = [
    "💨 The fastest wind speed ever recorded on Earth was 253 mph (407 km/h) in Australia.",
    "🌡️ The coldest temperature ever recorded was -128.6°F (-89.2°C) in Antarctica.",
    "⚡ Lightning strikes the Earth about 100 times per second!",
    "🌊 Hurricanes can release energy equal to 10,000 nuclear bombs.",
    "❄️ The largest snowflake ever recorded was 15 inches wide in Montana.",
    "☔ The wettest place on Earth is Mawsynram, India, with 467 inches of rain per year!"
];

// Display random fun fact
function showRandomFact() {
    const factElement = document.getElementById("fact");
    const randomIndex = Math.floor(Math.random() * facts.length);
    factElement.textContent = facts[randomIndex];
}
setInterval(showRandomFact, 7000);
showRandomFact(); // Run immediately

// Get Weather Data
async function getWeather() {
    const city = document.getElementById("city").value.trim();

    if (city === "") {
        weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    loadingDiv.classList.remove("hidden"); // Show loading
    weatherDiv.innerHTML = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            // Fetch city image
            const imageUrl = await getCityImage(city);

            // Display Weather Info
            weatherDiv.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <img src="${imageUrl}" alt="${city}" class="city-image"/>
                <p>🌡️ Temperature: ${data.main.temp}°C</p>
                <p>☁️ Condition: ${data.weather[0].description}</p>
                <p>💨 Humidity: ${data.main.humidity}%</p>
            `;
        } else {
            weatherDiv.innerHTML = "<p>❌ City not found! Please try again.</p>";
        }
    } catch (error) {
        weatherDiv.innerHTML = "<p>⚠️ Error fetching data. Check your internet connection.</p>";
    } finally {
        loadingDiv.classList.add("hidden"); // Hide loading
    }
}

// Fetch city images using API
async function getCityImage(city) {
    const apiKey = "47br5Bn2eoFnFeTJGfs-1wOuch3rUpHlD1lbHEIubRQ"; // Your image API key
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKey}`);
    const data = await response.json();
    
    if (data.results.length > 0) {
        return data.results[0].urls.regular;
    } else {
        return "default.jpg"; // Fallback image
    }
}

// Fetch global weather updates
async function fetchGlobalWeatherUpdates() {
    const cities = ["New York", "Tokyo", "London", "Paris", "Sydney", "Dubai"];
    const globalWeatherList = document.getElementById("global-updates");
    globalWeatherList.innerHTML = "";

    for (let city of cities) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${city}:</strong> ${data.main.temp}°C, ${data.weather[0].description}`;
            globalWeatherList.appendChild(listItem);
        }
    }
}
fetchGlobalWeatherUpdates();
setInterval(fetchGlobalWeatherUpdates, 30000); // Update every 30s
