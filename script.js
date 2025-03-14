const apiKey = "32647dfe3600b04381e9560af76464c9"; 
const weatherDiv = document.getElementById("weather");
const loader = document.getElementById("loader");
const greeting = document.getElementById("greeting");
const music = document.getElementById("background-music");

// Set Greeting Based on Time
function updateGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
        greeting.innerText = "🌞 Good Morning! Check the Weather:";
    } else if (hour < 18) {
        greeting.innerText = "☀️ Good Afternoon! Check the Weather:";
    } else {
        greeting.innerText = "🌙 Good Evening! Check the Weather:";
    }
}

// Fetch Weather by City Name
async function getWeather() {
    const city = document.getElementById("city").value.trim();
    if (!city) {
        weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    loader.style.display = "block"; 

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        loader.style.display = "none";  

        if (data.cod === 200) {
            updateBackground(city);
            weatherDiv.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>🌡️ Temperature: ${data.main.temp}°C (Feels like ${data.main.feels_like}°C)</p>
                <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
                <p>🌍 Pressure: ${data.main.pressure} hPa</p>
            `;
        } else {
            weatherDiv.innerHTML = "<p>❌ City not found!</p>";
        }
    } catch (error) {
        loader.style.display = "none";  
        weatherDiv.innerHTML = "<p>⚠️ Error fetching data.</p>";
    }
}

// Fetch User’s Location Weather
function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            weatherDiv.innerHTML = `<h2>${data.name}</h2><p>🌡️ ${data.main.temp}°C</p>`;
        });
    }
}

// Play/Stop Background Music
function toggleMusic() {
    music.paused ? music.play() : music.pause();
}

updateGreeting();
