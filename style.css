const apiKey = "32647dfe3600b04381e9560af76464c9"; // Replace with your OpenWeather API key
const unsplashApiKey = "47br5Bn2eoFnFeTJGfs-1wOuch3rUpHlD1lbHEIubRQ"; // Replace with your Unsplash API key
const weatherDiv = document.getElementById("weather");

async function getWeather() {
    const city = document.getElementById("city").value.trim(); // Get city input

    if (city === "") {
        weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const imageUrl = `https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashApiKey}`;

    try {
        const [weatherResponse, imageResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(imageUrl)
        ]);

        const weatherData = await weatherResponse.json();
        const imageData = await imageResponse.json();

        if (weatherData.cod === 200) {
            // Get weather condition
            const weatherCondition = weatherData.weather[0].description.toLowerCase();

            // Update Background Image using API response
            document.body.style.backgroundImage = `url(${imageData.urls.regular})`;
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
        } else {
            weatherDiv.innerHTML = "<p>❌ City not found! Please try again.</p>";
        }
    } catch (error) {
        weatherDiv.innerHTML = "<p>⚠️ Error fetching data. Check your internet connection.</p>";
        console.error("Error fetching weather or image data:", error);
    }
}
