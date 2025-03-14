const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your API key

function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
        if (data.cod === 200) {
            document.getElementById("weather").innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <p>🌡️ ${data.main.temp}°C</p>
                <p>☁️ ${data.weather[0].main}</p>
            `;

            changeBackground(data.weather[0].main);
        } else {
            alert("City not found! Please try again.");
        }
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        alert("Failed to fetch weather data. Please try again later.");
    });
}

function changeBackground(weatherCondition) {
    let imageUrl = "images/default.jpg"; // Default background

    switch (weatherCondition.toLowerCase()) {
        case "clear":
            imageUrl = "images/clear.jpg";
            break;
        case "clouds":
            imageUrl = "images/cloudy.jpg";
            break;
        case "rain":
            imageUrl = "images/rainy.jpg";
            break;
        case "snow":
            imageUrl = "images/snowy.jpg";
            break;
        case "thunderstorm":
            imageUrl = "images/thunderstorm.jpg";
            break;
        case "drizzle":
            imageUrl = "images/drizzle.jpg";
            break;
        case "mist":
        case "fog":
            imageUrl = "images/foggy.jpg";
            break;
    }

    document.body.style.background = `url('${imageUrl}') no-repeat center center/cover`;
}
