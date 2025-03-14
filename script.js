const apiKey = "32647dfe3600b04381e9560af76464c9";  // Replace with your actual OpenWeatherMap API key
const unsplashKey = "47br5Bn2eoFnFeTJGfs-1wOuch3rUpHlD1lbHEIubRQ"; // Your Unsplash API key
const weatherDiv = document.getElementById("weather");

async function getWeather() {
    const location = document.getElementById("city").value.trim(); // Get city or area input

    if (location === "") {
        weatherDiv.innerHTML = "<p>Please enter a city or area name.</p>";
        return;
    }

    try {
        // Step 1: Convert location name to Latitude & Longitude using Geocoding API
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (geoData.length === 0) {
            weatherDiv.innerHTML = "<p>❌ Location not found! Try again.</p>";
            return;
        }

        const { lat, lon, name, state, country } = geoData[0];

        // Step 2: Fetch Weather Data using Latitude & Longitude
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod === 200) {
            // Fetch city image from Unsplash API
            updateBackground(name);

            // Display Weather Info
            weatherDiv.innerHTML = `
                <h2>${name}, ${state ? state + ', ' : ''}${country}</h2>
                <p>🌡️ Temperature: ${weatherData.main.temp}°C</p>
                <p>☁️ Condition: ${weatherData.weather[0].description}</p>
                <p>💨 Humidity: ${weatherData.main.humidity}%</p>
            `;
        } else {
            weatherDiv.innerHTML = "<p>❌ Weather data not found! Please try again.</p>";
        }
    } catch (error) {
        weatherDiv.innerHTML = "<p>⚠️ Error fetching data. Check your internet connection.</p>";
        console.error("Error fetching weather:", error);
    }
}

// Function to get a city image from Unsplash and set it as background
async function updateBackground(city) {
    try {
        const unsplashUrl = `https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashKey}`;
        const response = await fetch(unsplashUrl);
        const data = await response.json();

        if (data.urls && data.urls.regular) {
            document.body.style.backgroundImage = `url('${data.urls.regular}')`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = "background 0.5s ease-in-out";
        } else {
            console.warn("No image found for this city, keeping default background.");
        }
    } catch (error) {
        console.error("Error fetching Unsplash image:", error);
    }
}
