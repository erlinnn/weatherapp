const apiKey = "32647dfe3600b04381e9560af76464c9";  // Replace with your OpenWeather API key
const unsplashApiKey = "47br5Bn2eoFnFeTJGfs-1wOuch3rUpHlD1lbHEIubRQ";  // Replace with your Unsplash API key
const weatherDiv = document.getElementById("weather");

async function getWeather() {
    const city = document.getElementById("city").value.trim(); // Get city input

    if (city === "") {
        weatherDiv.innerHTML = "<p>⚠️ Please enter a city name.</p>";
        return;
    }

    weatherDiv.innerHTML = "<p>⏳ Fetching weather data...</p>";

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const unsplashUrl = `https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashApiKey}`;

    try {
        // Fetch Weather Data
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod !== 200) {
            weatherDiv.innerHTML = "<p>❌ City not found! Please try again.</p>";
            return;
        }

        // Fetch City Image from Unsplash
        const imageResponse = await fetch(unsplashUrl);
        const imageData = await imageResponse.json();
        const cityImage = imageData.urls?.regular || "images/default.jpg"; // Fallback image

        // Update Background Image
        document.body.style.backgroundImage = `url('${cityImage}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.transition = "background 0.5s ease-in-out";

        // Display Weather Info
        weatherDiv.innerHTML = `
            <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
            <p>🌡️ Temperature: ${weatherData.main.temp}°C</p>
            <p>☁️ Condition: ${weatherData.weather[0].description}</p>
            <p>💨 Humidity: ${weatherData.main.humidity}%</p>
        `;

    } catch (error) {
        weatherDiv.innerHTML = "<p>⚠️ Error fetching data. Check your API keys or internet connection.</p>";
        console.error("Error:", error);
    }
}
