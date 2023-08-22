const LATITUDE = 37.823; // Replace with your latitude
const LONGITUDE = -122.233; // Replace with your longitude
const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&hourly=temperature_2m,weathercode&current_weather=true&timezone=auto`;

async function getWeatherData() {
    try {
        const response = await fetch(WEATHER_API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
}

// ... (existing code)

// ... (existing code)

async function updateTimeBar() {
    const timeBar = document.getElementById("top-bar");
    const currentDate = new Date().toLocaleDateString("en-US");
    const currentTime = new Date().toLocaleTimeString("en-US");

    const weatherData = await getWeatherData();

    console.log("Weather Data:", weatherData); // Log weather data for debugging

    let weatherInfo = "";

    if (weatherData && weatherData.current_weather) {
        const temperatureCelsius = weatherData.current_weather.temperature;
        const temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32;
        weatherInfo = ` | Weather: ${Math.round(temperatureFahrenheit)}°F (${Math.round(temperatureCelsius)}°C)`;
    } else {
        console.log("No weather data available."); // Log for debugging
    }

    timeBar.textContent = `Date: ${currentDate} | Time: ${currentTime}${weatherInfo}`;
}

// ... (existing code)

updateTimeBar();
setInterval(updateTimeBar, 60000);


const scheduleByDay = {
    "Monday": [
        { name: "Period 1", startTime: "08:30:00", endTime: "09:15:00" },
        { name: "Period 2", startTime: "09:25:00", endTime: "10:10:00" },
        { name: "Brunch", startTime: "10:10:00", endTime: "10:15:00" },
        { name: "Period 3", startTime: "10:25:00", endTime: "11:10:00" },
        { name: "Period 4", startTime: "11:20:00", endTime: "12:10:00" },
        { name: "Period 5", startTime: "12:20:00", endTime: "13:05:00" },
        { name: "Lunch", startTime: "13:00:00", endTime: "13:35:00" },
        { name: "Period 6", startTime: "13:45:00", endTime: "14:30:00" },
        { name: "Period 7", startTime: "14:40:00", endTime: "15:25:00" }
    ],
    "Tuesday": [
        { name: "Period 1", startTime: "08:30:00", endTime: "10:00:00" },
        { name: "Brunch", startTime: "10:00:00", endTime: "10:05:00" },
        { name: "Period 3", startTime: "10:15:00", endTime: "11:45:00" },
        { name: "Period 5", startTime: "11:55:00", endTime: "13:25:00" },
        { name: "Lunch", startTime: "13:25:00", endTime: "13:55:00" },
        { name: "Period 7", startTime: "14:05:00", endTime: "15:35:00" }
    ],
    "Wednesday": [
        { name: "Period 2", startTime: "08:30:00", endTime: "10:00:00" },
        { name: "Brunch", startTime: "10:00:00", endTime: "10:05:00" },
        { name: "Academy", startTime: "10:15:00", endTime: "11:45:00" },
        { name: "Period 4", startTime: "11:00:00", endTime: "12:40:00" },
        { name: "Lunch", startTime: "12:40:00", endTime: "13:10:00" },
        { name: "Period 6", startTime: "13:20:00", endTime: "14:50:00" }
    ],
    "Thursday": [
        { name: "Period 1", startTime: "08:30:00", endTime: "10:00:00" },
        { name: "Brunch", startTime: "10:00:00", endTime: "10:05:00" },
        { name: "Period 3", startTime: "10:15:00", endTime: "11:45:00" },
        { name: "Period 5", startTime: "11:55:00", endTime: "13:25:00" },
        { name: "Lunch", startTime: "13:25:00", endTime: "13:55:00" },
        { name: "Period 7", startTime: "14:05:00", endTime: "15:35:00" }
    ],
    "Friday": [
        { name: "Period 2", startTime: "08:30:00", endTime: "10:00:00" },
        { name: "Brunch", startTime: "10:00:00", endTime: "10:05:00" },
        { name: "Academy", startTime: "10:15:00", endTime: "11:45:00" },
        { name: "Period 4", startTime: "11:00:00", endTime: "12:40:00" },
        { name: "Lunch", startTime: "12:40:00", endTime: "13:10:00" },
        { name: "Period 6", startTime: "13:20:00", endTime: "14:50:00" }
    ],
    "Saturday": [
        { name: "Period 1", startTime: "08:30:00", endTime: "09:15:00" },
        { name: "Period 2", startTime: "09:25:00", endTime: "10:10:00" },
        { name: "Brunch", startTime: "10:10:00", endTime: "10:15:00" },
        { name: "Period 3", startTime: "10:25:00", endTime: "11:10:00" },
        { name: "Period 4", startTime: "11:20:00", endTime: "12:10:00" },
        { name: "Period 5", startTime: "12:20:00", endTime: "13:05:00" },
        { name: "Lunch", startTime: "13:00:00", endTime: "13:35:00" },
        { name: "Period 6", startTime: "13:45:00", endTime: "14:30:00" },
        { name: "Period 7", startTime: "14:40:00", endTime: "15:25:00" }
    ],
};

function getScheduleForDay(day) {
    return scheduleByDay[day] || [];
}

function getTimeRemaining(endTime) {
    const now = new Date();
    const end = new Date(now.toDateString() + " " + endTime);
    const timeRemaining = end - now;

    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    return { hours, minutes, seconds };
}


function updateCountdowns() {
    const countdownContainer = document.getElementById("countdowns");
    countdownContainer.innerHTML = "";

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayIndex = new Date().getDay();
    const currentDay = daysOfWeek[currentDayIndex];

    const currentSchedule = getScheduleForDay(currentDay);
    const now = new Date();

    let nextPeriod = null;

    for (const event of currentSchedule) {
        const startTime = new Date(now.toDateString() + " " + event.startTime);

        if (startTime > now) {
            nextPeriod = event;
            break;
        }
    }

    if (!nextPeriod) {
        const noScheduleMessage = document.createElement("div");
        noScheduleMessage.innerText = "No more periods for today";
        countdownContainer.appendChild(noScheduleMessage);
    } else {
        const countdown = getTimeRemaining(nextPeriod.startTime);
        const countdownText = `${nextPeriod.name} starts in: ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`;

        const countdownElement = document.createElement("div");
        countdownElement.innerText = countdownText;
        countdownContainer.appendChild(countdownElement);
    }
}

// Call updateCountdowns initially for the current date
updateCountdowns();

// Update countdowns every second
setInterval(updateCountdowns, 1000);


