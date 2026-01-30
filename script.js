const GLOBE_IMAGE_URL = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';
const BUMP_IMAGE_URL = 'https://unpkg.com/three-globe/example/img/earth-topology.png';
// ============================================
// CITY DATABASE
// ============================================
const CITIES = [
    { name: 'New York', country: 'US', state: 'NY', lat: 40.7128, lon: -74.0060 },
    { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
    { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
    { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
    { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
    { name: 'Dubai', country: 'AE', lat: 25.2048, lon: 55.2708 },
    { name: 'Singapore', country: 'SG', lat: 1.3521, lon: 103.8198 },
    { name: 'Mumbai', country: 'IN', lat: 19.0760, lon: 72.8777 },
    { name: 'Mysore', country: 'IN', state: 'Karnataka', lat: 12.2958, lon: 76.6394 },
    { name: 'Bangalore', country: 'IN', state: 'Karnataka', lat: 12.9716, lon: 77.5946 },
    { name: 'Delhi', country: 'IN', lat: 28.7041, lon: 77.1025 },
    { name: 'Los Angeles', country: 'US', state: 'CA', lat: 34.0522, lon: -118.2437 },
    { name: 'Chicago', country: 'US', state: 'IL', lat: 41.8781, lon: -87.6298 },
    { name: 'Toronto', country: 'CA', lat: 43.6532, lon: -79.3832 },
    { name: 'Berlin', country: 'DE', lat: 52.5200, lon: 13.4050 },
    { name: 'Moscow', country: 'RU', lat: 55.7558, lon: 37.6173 },
    { name: 'Beijing', country: 'CN', lat: 39.9042, lon: 116.4074 },
    { name: 'Seoul', country: 'KR', lat: 37.5665, lon: 126.9780 },
    { name: 'Cairo', country: 'EG', lat: 30.0444, lon: 31.2357 },
    { name: 'Cape Town', country: 'ZA', lat: -33.9249, lon: 18.4241 },
    { name: 'Rio de Janeiro', country: 'BR', lat: -22.9068, lon: -43.1729 },
    { name: 'Buenos Aires', country: 'AR', lat: -34.6037, lon: -58.3816 },
    { name: 'Mexico City', country: 'MX', lat: 19.4326, lon: -99.1332 },
    { name: 'Istanbul', country: 'TR', lat: 41.0082, lon: 28.9784 },
    { name: 'Bangkok', country: 'TH', lat: 13.7563, lon: 100.5018 },
    { name: 'Hong Kong', country: 'HK', lat: 22.3193, lon: 114.1694 },
    { name: 'Amsterdam', country: 'NL', lat: 52.3676, lon: 4.9041 },
    { name: 'Rome', country: 'IT', lat: 41.9028, lon: 12.4964 },
    { name: 'Madrid', country: 'ES', lat: 40.4168, lon: -3.7038 },
    { name: 'Lisbon', country: 'PT', lat: 38.7223, lon: -9.1393 },
];
// ============================================
// WEATHER ICONS
// ============================================
const WEATHER_ICONS = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️',
};
const WEATHER_DESCRIPTIONS = ['Clear sky', 'Few clouds', 'Scattered clouds', 'Broken clouds', 'Light rain', 'Sunny', 'Partly cloudy', 'Overcast'];
const WEATHER_CODES = ['01d', '02d', '03d', '04d', '10d', '01d', '02d', '04d'];
// ============================================
// STATE
// ============================================
let globe = null;
let currentCity = null;
let tempUnit = 'celsius';
let speedUnit = 'kmh';
// ============================================
// DOM ELEMENTS
// ============================================
const elements = {
    globeContainer: document.getElementById('globeViz'),
    locationInput: document.getElementById('locationInput'),
    suggestions: document.getElementById('suggestions'),
    welcomeScreen: document.getElementById('welcomeScreen'),
    weatherDashboard: document.getElementById('weatherDashboard'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    // Current Weather
    cityName: document.getElementById('cityName'),
    countryName: document.getElementById('countryName'),
    weatherIcon: document.getElementById('weatherIcon'),
    mainTemp: document.getElementById('mainTemp'),
    tempUnitEl: document.getElementById('tempUnit'),
    weatherDesc: document.getElementById('weatherDesc'),
    tempHigh: document.getElementById('tempHigh'),
    tempLow: document.getElementById('tempLow'),
    feelsLike: document.getElementById('feelsLike'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('windSpeed'),
    windDir: document.getElementById('windDir'),
    pressure: document.getElementById('pressure'),
    visibility: document.getElementById('visibility'),
    sunrise: document.getElementById('sunrise'),
    sunset: document.getElementById('sunset'),
    // Forecasts
    hourlyForecast: document.getElementById('hourlyForecast'),
    weeklyForecast: document.getElementById('weeklyForecast'),
    // Air Quality
    aqiCircle: document.getElementById('aqiCircle'),
    aqiValue: document.getElementById('aqiValue'),
    aqiLevel: document.getElementById('aqiLevel'),
    aqiDesc: document.getElementById('aqiDesc'),
    pollutants: document.getElementById('pollutants'),
    // UV Index
    uvCircle: document.getElementById('uvCircle'),
    uvValue: document.getElementById('uvValue'),
    uvLevel: document.getElementById('uvLevel'),
    uvAdvice: document.getElementById('uvAdvice'),
    uvIndicator: document.getElementById('uvIndicator'),
    // Wind
    windArrow: document.getElementById('windArrow'),
    windSpeedLg: document.getElementById('windSpeedLg'),
    windDirLg: document.getElementById('windDirLg'),
    windGust: document.getElementById('windGust'),
    pressureLg: document.getElementById('pressureLg'),
    clouds: document.getElementById('clouds'),
    // Moon
    moonIcon: document.getElementById('moonIcon'),
    moonPhase: document.getElementById('moonPhase'),
    moonDay: document.getElementById('moonDay'),
    nextFull: document.getElementById('nextFull'),
    nextNew: document.getElementById('nextNew'),
    illuminationFill: document.getElementById('illuminationFill'),
    illuminationPercent: document.getElementById('illuminationPercent'),
    // Settings
    tempCelsius: document.getElementById('tempCelsius'),
    tempFahrenheit: document.getElementById('tempFahrenheit'),
    speedKmh: document.getElementById('speedKmh'),
    speedMph: document.getElementById('speedMph'),
    speedMs: document.getElementById('speedMs'),
};
// ============================================
// INITIALIZE GLOBE
// ============================================
function initGlobe() {
    globe = new Globe(elements.globeContainer)
        .globeImageUrl(GLOBE_IMAGE_URL)
        .bumpImageUrl(BUMP_IMAGE_URL)
        .showAtmosphere(true)
        .atmosphereColor('#00d4ff')
        .atmosphereAltitude(0.25)
        .backgroundColor('rgba(0,0,0,0)')
        .pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 0);
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.enableZoom = true;
    controls.minDistance = 120;
    controls.maxDistance = 500;
    controls.enablePan = false;
    window.addEventListener('resize', () => {
        globe.width(window.innerWidth);
        globe.height(window.innerHeight);
    });
    
    globe.width(window.innerWidth);
    globe.height(window.innerHeight);
}
// ============================================
// ZOOM TO LOCATION
// ============================================
function zoomToLocation(lat, lon, name) {
    const controls = globe.controls();
    controls.autoRotate = false;
    globe
        .labelsData([{ lat, lng: lon, text: name }])
        .labelLat(d => d.lat)
        .labelLng(d => d.lng)
        .labelText(d => d.text)
        .labelColor(() => '#00d4ff')
        .labelSize(() => 1.2)
        .labelDotRadius(0.4)
        .labelAltitude(0.01);
    globe
        .ringsData([{ lat, lng: lon, maxR: 3, propagationSpeed: 2, repeatPeriod: 1000 }])
        .ringLat(d => d.lat)
        .ringLng(d => d.lng)
        .ringColor(() => () => '#00d4ff')
        .ringMaxRadius(d => d.maxR)
        .ringPropagationSpeed(d => d.propagationSpeed)
        .ringRepeatPeriod(d => d.repeatPeriod);
    globe.pointOfView({ lat, lng: lon, altitude: 0.8 }, 2000);
}
// ============================================
// RESET GLOBE
// ============================================
function resetGlobe() {
    const controls = globe.controls();
    controls.autoRotate = true;
    globe.labelsData([]);
    globe.ringsData([]);
    globe.pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 2000);
}
// ============================================
// SEARCH CITIES
// ============================================
function searchCities(query) {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return CITIES.filter(city =>
        city.name.toLowerCase().includes(lower) ||
        city.country.toLowerCase().includes(lower) ||
        (city.state && city.state.toLowerCase().includes(lower))
    ).slice(0, 5);
}
// ============================================
// GENERATE MOCK DATA
// ============================================
function generateWeatherData(city) {
    const baseTemp = 15 + Math.random() * 20;
    const iconIndex = Math.floor(Math.random() * WEATHER_CODES.length);
    const now = Date.now() / 1000;
    
    return {
        city: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
        temp: Math.round(baseTemp),
        feelsLike: Math.round(baseTemp + (Math.random() - 0.5) * 6),
        tempMin: Math.round(baseTemp - 3 - Math.random() * 3),
        tempMax: Math.round(baseTemp + 3 + Math.random() * 3),
        humidity: Math.round(40 + Math.random() * 50),
        pressure: Math.round(1000 + Math.random() * 30),
        visibility: Math.round(8000 + Math.random() * 2000),
        windSpeed: Math.round(5 + Math.random() * 20),
        windDeg: Math.round(Math.random() * 360),
        windGust: Math.round(10 + Math.random() * 15),
        clouds: Math.round(Math.random() * 100),
        description: WEATHER_DESCRIPTIONS[iconIndex],
        icon: WEATHER_CODES[iconIndex],
        sunrise: now - (now % 86400) + 6 * 3600,
        sunset: now - (now % 86400) + 18 * 3600,
    };
}
function generateHourlyForecast() {
    const hours = [];
    for (let i = 0; i < 24; i++) {
        const time = new Date();
        time.setHours(time.getHours() + i, 0, 0, 0);
        const isNight = time.getHours() < 6 || time.getHours() > 18;
        const iconIndex = Math.floor(Math.random() * WEATHER_CODES.length);
        let icon = WEATHER_CODES[iconIndex];
        if (isNight) icon = icon.replace('d', 'n');
        
        hours.push({
            time,
            temp: Math.round(18 + Math.sin(i / 24 * Math.PI * 2) * 8 + Math.random() * 4),
            icon,
            pop: Math.round(Math.random() * 100) / 100,
        });
    }
    return hours;
}
function generateWeeklyForecast() {
    const days = [];
    const icons = ['01d', '02d', '03d', '04d', '10d', '09d', '13d'];
    const descriptions = ['Clear', 'Partly Cloudy', 'Cloudy', 'Overcast', 'Light Rain', 'Rain', 'Snow'];
    
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const baseTemp = 15 + Math.random() * 15;
        const iconIndex = Math.floor(Math.random() * icons.length);
        
        days.push({
            date,
            tempMax: Math.round(baseTemp + 5 + Math.random() * 5),
            tempMin: Math.round(baseTemp - 5 - Math.random() * 5),
            icon: icons[iconIndex],
            description: descriptions[iconIndex],
            pop: Math.round(Math.random() * 100) / 100,
        });
    }
    return days;
}
function generateAirQuality() {
    return {
        aqi: Math.floor(Math.random() * 5) + 1,
        pm2_5: Math.round(5 + Math.random() * 50),
        pm10: Math.round(10 + Math.random() * 80),
        o3: Math.round(30 + Math.random() * 80),
        no2: Math.round(5 + Math.random() * 40),
        so2: Math.round(Math.random() * 20),
        co: Math.round(200 + Math.random() * 300),
    };
}
function getMoonPhase() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    let c = Math.floor(365.25 * year);
    let e = Math.floor(30.6 * month);
    let jd = c + e + day - 694039.09;
    jd /= 29.5305882;
    let phase = jd - Math.floor(jd);
    let phaseDay = Math.round(phase * 29.5);
    const phases = [
        { name: 'New Moon', icon: '🌑', illumination: 0 },
        { name: 'Waxing Crescent', icon: '🌒', illumination: 12.5 },
        { name: 'First Quarter', icon: '🌓', illumination: 25 },
        { name: 'Waxing Gibbous', icon: '🌔', illumination: 37.5 },
        { name: 'Full Moon', icon: '🌕', illumination: 50 },
        { name: 'Waning Gibbous', icon: '🌖', illumination: 62.5 },
        { name: 'Last Quarter', icon: '🌗', illumination: 75 },
        { name: 'Waning Crescent', icon: '🌘', illumination: 87.5 },
    ];
    const phaseIndex = Math.floor(phaseDay / 3.69) % 8;
    return {
        ...phases[phaseIndex],
        day: phaseDay,
        nextFullMoon: Math.round((14.75 - phaseDay + 29.5) % 29.5),
        nextNewMoon: Math.round((29.5 - phaseDay) % 29.5),
    };
}
// ============================================
// CONVERSION FUNCTIONS
// ============================================
function convertTemp(celsius) {
    if (tempUnit === 'fahrenheit') {
        return Math.round(celsius * 9/5 + 32);
    }
    return celsius;
}
function convertSpeed(kmh) {
    switch (speedUnit) {
        case 'mph': return Math.round(kmh * 0.621371);
        case 'ms': return Math.round(kmh / 3.6 * 10) / 10;
        default: return kmh;
    }
}
function getSpeedLabel() {
    switch (speedUnit) {
        case 'mph': return 'mph';
        case 'ms': return 'm/s';
        default: return 'km/h';
    }
}
function getTempLabel() {
    return tempUnit === 'fahrenheit' ? '°F' : '°C';
}
// ============================================
// UI UPDATE FUNCTIONS
// ============================================
function formatTime(unix) {
    return new Date(unix * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}
function formatHour(date) {
    return date.toLocaleTimeString([], { hour: 'numeric', hour12: true });
}
function getDayName(date) {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return 'Today';
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { weekday: 'short' });
}
function getWindDirection(deg) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
}
function getAQIInfo(aqi) {
    const levels = [
        { label: 'Good', class: 'good', desc: 'Air quality is satisfactory, and air pollution poses little or no risk.' },
        { label: 'Fair', class: 'fair', desc: 'Air quality is acceptable. Some pollutants may pose a moderate health concern.' },
        { label: 'Moderate', class: 'moderate', desc: 'Members of sensitive groups may experience health effects.' },
        { label: 'Poor', class: 'poor', desc: 'Everyone may begin to experience health effects.' },
        { label: 'Very Poor', class: 'hazardous', desc: 'Health alert: everyone may experience serious health effects.' },
    ];
    return levels[aqi - 1] || levels[0];
}
function getUVInfo(uv) {
    if (uv <= 2) return { level: 'Low', class: 'low', advice: 'No protection needed. Safe to be outside.' };
    if (uv <= 5) return { level: 'Moderate', class: 'moderate', advice: 'Wear sunglasses on bright days. Use SPF 30+.' };
    if (uv <= 7) return { level: 'High', class: 'high', advice: 'Reduce sun exposure between 10am-4pm.' };
    if (uv <= 10) return { level: 'Very High', class: 'very-high', advice: 'Minimize sun exposure. Wear protective clothing.' };
    return { level: 'Extreme', class: 'extreme', advice: 'Avoid sun exposure. Stay indoors during midday.' };
}
// ============================================
// RENDER FUNCTIONS
// ============================================
function renderCurrentWeather(weather) {
    elements.cityName.textContent = weather.city;
    elements.countryName.textContent = weather.country;
    elements.weatherIcon.textContent = WEATHER_ICONS[weather.icon] || '☀️';
    elements.mainTemp.textContent = convertTemp(weather.temp);
    elements.tempUnitEl.textContent = getTempLabel();
    elements.weatherDesc.textContent = weather.description;
    elements.tempHigh.textContent = `${convertTemp(weather.tempMax)}${getTempLabel()}`;
    elements.tempLow.textContent = `${convertTemp(weather.tempMin)}${getTempLabel()}`;
    elements.feelsLike.textContent = `${convertTemp(weather.feelsLike)}${getTempLabel()}`;
    elements.humidity.textContent = `${weather.humidity}%`;
    elements.windSpeed.textContent = `${convertSpeed(weather.windSpeed)} ${getSpeedLabel()}`;
    elements.windDir.textContent = `${weather.windDeg}°`;
    elements.pressure.textContent = `${weather.pressure} hPa`;
    elements.visibility.textContent = `${(weather.visibility / 1000).toFixed(1)} km`;
    elements.sunrise.textContent = formatTime(weather.sunrise);
    elements.sunset.textContent = formatTime(weather.sunset);
    
    // Wind compass
    elements.windArrow.style.transform = `translate(-50%, -50%) rotate(${weather.windDeg}deg)`;
    elements.windSpeedLg.textContent = `${convertSpeed(weather.windSpeed)} ${getSpeedLabel()}`;
    elements.windDirLg.textContent = `${getWindDirection(weather.windDeg)} (${weather.windDeg}°)`;
    elements.windGust.textContent = weather.windGust ? `${convertSpeed(weather.windGust)} ${getSpeedLabel()}` : '-';
    elements.pressureLg.textContent = `${weather.pressure} hPa`;
    elements.clouds.textContent = `${weather.clouds}%`;
}
function renderHourlyForecast(hours) {
    elements.hourlyForecast.innerHTML = hours.map((hour, i) => `
        <div class="hour-item">
            <span class="time">${i === 0 ? 'Now' : formatHour(hour.time)}</span>
            <span class="icon">${WEATHER_ICONS[hour.icon] || '☀️'}</span>
            <span class="temp">${convertTemp(hour.temp)}°</span>
            ${hour.pop > 0 ? `<span class="pop">💧${Math.round(hour.pop * 100)}%</span>` : ''}
        </div>
    `).join('');
}
function renderWeeklyForecast(days) {
    elements.weeklyForecast.innerHTML = days.map(day => `
        <div class="day-item">
            <div class="day">
                <span class="day-name">${getDayName(day.date)}</span>
                <span class="day-date">${day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
            <div class="condition">
                <span class="icon">${WEATHER_ICONS[day.icon] || '☀️'}</span>
                <span class="desc">${day.description}</span>
            </div>
            ${day.pop > 0 ? `<span class="pop">💧${Math.round(day.pop * 100)}%</span>` : '<span class="pop"></span>'}
            <div class="temps">
                <span class="temp-high">${convertTemp(day.tempMax)}°</span>
                <span class="temp-low">${convertTemp(day.tempMin)}°</span>
            </div>
        </div>
    `).join('');
}
function renderAirQuality(aqi) {
    const info = getAQIInfo(aqi.aqi);
    
    elements.aqiCircle.className = `aqi-circle ${info.class}`;
    elements.aqiValue.textContent = aqi.aqi;
    elements.aqiLevel.textContent = info.label;
    elements.aqiLevel.className = info.class;
    elements.aqiDesc.textContent = info.desc;
    
    const pollutants = [
        { label: 'PM2.5', value: aqi.pm2_5, unit: 'μg/m³', max: 75 },
        { label: 'PM10', value: aqi.pm10, unit: 'μg/m³', max: 150 },
        { label: 'O₃', value: aqi.o3, unit: 'μg/m³', max: 180 },
        { label: 'NO₂', value: aqi.no2, unit: 'μg/m³', max: 200 },
        { label: 'SO₂', value: aqi.so2, unit: 'μg/m³', max: 350 },
        { label: 'CO', value: aqi.co, unit: 'μg/m³', max: 10000 },
    ];
    
    elements.pollutants.innerHTML = pollutants.map(p => {
        const percent = Math.min((p.value / p.max) * 100, 100);
        const colorClass = percent < 33 ? 'good' : percent < 66 ? 'moderate' : 'bad';
        return `
            <div class="pollutant">
                <div class="pollutant-header">
                    <span class="pollutant-name">${p.label}</span>
                    <span class="pollutant-value">${p.value.toFixed(1)} ${p.unit}</span>
                </div>
                <div class="pollutant-bar">
                    <div class="pollutant-fill ${colorClass}" style="width: ${percent}%"></div>
                </div>
            </div>
        `;
    }).join('');
}
function renderUVIndex(uv) {
    const info = getUVInfo(uv);
    
    elements.uvCircle.className = `uv-circle ${info.class}`;
    elements.uvValue.textContent = uv;
    elements.uvLevel.textContent = info.level;
    elements.uvLevel.className = info.class;
    elements.uvAdvice.textContent = info.advice;
    elements.uvIndicator.style.left = `${Math.min((uv / 11) * 100, 100)}%`;
}
function renderMoonPhase() {
    const moon = getMoonPhase();
    
    elements.moonIcon.textContent = moon.icon;
    elements.moonPhase.textContent = moon.name;
    elements.moonDay.textContent = `Day ${moon.day} of lunar cycle`;
    elements.nextFull.textContent = `${moon.nextFullMoon} days`;
    elements.nextNew.textContent = `${moon.nextNewMoon} days`;
    
    const illumination = moon.illumination * 2; // 0-100
    elements.illuminationFill.style.width = `${illumination}%`;
    elements.illuminationPercent.textContent = `${Math.round(illumination)}%`;
}
// ============================================
// LOAD WEATHER
// ============================================
async function loadWeather(city) {
    currentCity = city;
    
    // Show loading
    elements.loadingOverlay.classList.remove('hidden');
    
    // Zoom globe
    zoomToLocation(city.lat, city.lon, city.name);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate data
    const weather = generateWeatherData(city);
    const hourly = generateHourlyForecast();
    const weekly = generateWeeklyForecast();
    const aqi = generateAirQuality();
    const uv = Math.min(11, Math.max(1, Math.round(8 - (weather.clouds / 15) + Math.random() * 3)));
    
    // Render
    renderCurrentWeather(weather);
    renderHourlyForecast(hourly);
    renderWeeklyForecast(weekly);
    renderAirQuality(aqi);
    renderUVIndex(uv);
    renderMoonPhase();
    
    // Show dashboard
    elements.welcomeScreen.classList.add('hidden');
    elements.weatherDashboard.classList.remove('hidden');
    elements.loadingOverlay.classList.add('hidden');
}
// ============================================
// REFRESH DISPLAY (for unit changes)
// ============================================
function refreshDisplay() {
    if (!currentCity) return;
    
    const weather = generateWeatherData(currentCity);
    const hourly = generateHourlyForecast();
    const weekly = generateWeeklyForecast();
    
    renderCurrentWeather(weather);
    renderHourlyForecast(hourly);
    renderWeeklyForecast(weekly);
}
// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Search input
    let searchTimeout;
    elements.locationInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            elements.suggestions.classList.remove('active');
            return;
        }
        
        searchTimeout = setTimeout(() => {
            const results = searchCities(query);
            if (results.length > 0) {
                elements.suggestions.innerHTML = results.map(city => `
                    <div class="suggestion-item" data-city="${city.name}">
                        <span class="icon">📍</span>
                        <span>${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}</span>
                    </div>
                `).join('');
                elements.suggestions.classList.add('active');
            } else {
                elements.suggestions.classList.remove('active');
            }
        }, 200);
    });
    
    // Suggestion clicks
    elements.suggestions.addEventListener('click', (e) => {
        const item = e.target.closest('.suggestion-item');
        if (item) {
            const cityName = item.dataset.city;
            const city = CITIES.find(c => c.name === cityName);
            if (city) {
                elements.locationInput.value = '';
                elements.suggestions.classList.remove('active');
                loadWeather(city);
            }
        }
    });
    
    // Quick city buttons
    document.querySelectorAll('.city-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cityName = btn.dataset.city;
            const city = CITIES.find(c => c.name === cityName);
            if (city) loadWeather(city);
        });
    });
    
    // Close suggestions on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            elements.suggestions.classList.remove('active');
        }
    });
    
    // Temperature unit toggle
    elements.tempCelsius.addEventListener('click', () => {
        tempUnit = 'celsius';
        elements.tempCelsius.classList.add('active');
        elements.tempFahrenheit.classList.remove('active');
        refreshDisplay();
    });
    
    elements.tempFahrenheit.addEventListener('click', () => {
        tempUnit = 'fahrenheit';
        elements.tempFahrenheit.classList.add('active');
        elements.tempCelsius.classList.remove('active');
        refreshDisplay();
    });
    
    // Speed unit toggle
    [elements.speedKmh, elements.speedMph, elements.speedMs].forEach(btn => {
        btn.addEventListener('click', () => {
            speedUnit = btn.id.replace('speed', '').toLowerCase();
            elements.speedKmh.classList.remove('active');
            elements.speedMph.classList.remove('active');
            elements.speedMs.classList.remove('active');
            btn.classList.add('active');
            refreshDisplay();
        });
    });
}
// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initGlobe();
    setupEventListeners();
});
