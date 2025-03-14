const apiKey = "32647dfe3600b04381e9560af76464c9";  // Replace with your OpenWeather API key
const unsplashApiKey = "47br5Bn2eoFnFeTJGfs-1wOuch3rUpHlD1lbHEIubRQ"; // Replace with your Unsplash API key
const weatherDiv = document.getElementById("weather");

async function getWeather() {
    const city = document.getElementById("city").value.trim(); // Get city input

    if (city === "") {
        weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();

        if (data.cod === 200) {
            // Update Background Image with City Image
            fetchCityImage(city);

            // Display Weather Info
            weatherDiv.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>🌡️ Temperature: ${data.main.temp}°C</p>
                <p>☁️ Condition: ${data.weather[0].description}</p>
                <p>💨 Humidity: ${data.main.humidity}%</p>
            `;
        } else {
            weatherDiv.innerHTML = "<p>❌ City not found! Please try again.</p>";
        }
    } catch (error) {
        weatherDiv.innerHTML = "<p>⚠️ Error fetching data. Check your internet connection.</p>";
        console.error("Error fetching weather:", error);
    }
}

// Function to fetch city image from Unsplash
async function fetchCityImage(city) {
    const unsplashUrl = `https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashApiKey}`;

    try {
        const response = await fetch(unsplashUrl);
        const data = await response.json();

        if (data.urls && data.urls.full) {
            document.body.style.backgroundImage = `url('${data.urls.full}')`;
        } else {
            document.body.style.backgroundImage = "url('images/default.jpg')"; // Fallback image
        }

        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.transition = "background 0.5s ease-in-out";
    } catch (error) {
        console.error("Error fetching city image:", error);
        document.body.style.backgroundImage = "url('images/default.jpg')";
    }
}
