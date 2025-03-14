const apiKey = "32647dfe3600b04381e9560af76464c9";  // Replace with your actual API key
const weatherDiv = document.getElementById("weather");

async function getWeather() {
    const city = document.getElementById("city").value.trim(); // Get city input

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
            
            // Update Background Image
            updateBackground(weatherCondition);

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

// Function to change background image based on weather
function updateBackground(condition) {
    const body = document.body;

    if (condition.includes("clear")) {
        body.style.backgroundImage = "url('images/sunny.jpg')";
    } else if (condition.includes("cloud")) {
        body.style.backgroundImage = "url('images/cloudy.jpg')";
    } else if (condition.includes("rain")) {
        body.style.backgroundImage = "url('images/rainy.jpg')";
    } else if (condition.includes("thunderstorm")) {
        body.style.backgroundImage = "url('images/storm.jpg')";
    } else if (condition.includes("snow")) {
        body.style.backgroundImage = "url('images/snow.jpg')";
    } else {
        body.style.backgroundImage = "url('images/default.jpg')";
    }

    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.transition = "background 0.5s ease-in-out";
}
