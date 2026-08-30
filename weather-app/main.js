const temperature = document.getElementById('temperature');
const wind = document.getElementById('wind');
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const weather = document.getElementById('weather');
const date = document.getElementById('date');


const saveWeather = localStorage.getItem('Weather');



async function loadSavedWeather() {

    try {

    if (saveWeather) {
    await getWeather(saveWeather)
    }
} catch (error) {
    console.log(error)
}

}
loadSavedWeather()



searchBtn.addEventListener('click', async () => {
    try {

        cityName.textContent = "Loading...";
   
        const searchInput = cityInput.value.trim().toLowerCase();
    
        const content = await getWeather(searchInput)

        localStorage.setItem('Weather', content)
        
    } 
    catch (error) {
        console.log(error)
    }
    
})



async function getWeather(citySearch) {

    try {

        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${citySearch}&count=1&language=en&format=json`)// 1- searching about the city

    if (!response.ok) {
        throw new Error("City not found");
        
    }
   
    const data = await response.json(); // transforming the data
    
    if (!data.results) {
    throw new Error("City not found");
    }

    const dataResults = data.results

    if (dataResults.length === 0) {
        throw new Error("City not found");
        
    }
    
    const city = data.results[0]; // getting the data
    
    const cityContent = cityName.textContent = city.name;
    

    const latitude = city.latitude;// getting the informating from data
    const longitude = city.longitude;// getting the informating from data


    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code`)//2- linking the latitude and longitude in the fetch to find the city where it excist for giving the weather to every search city
   
    const weatherData = await weatherResponse.json();


    temperature.textContent = `Temperature: ${weatherData.current.temperature_2m} °C`
    wind.textContent = `Wind: ${weatherData.current.wind_speed_10m} km/h`

    //weather
   if (weatherData.current.weather_code === 0) {

    weather.textContent = `Weather: Clear sky`;

   }

   else if (weatherData.current.weather_code >= 1 && weatherData.current.weather_code <= 3) {

    weather.textContent = `Weather: Cloudy`;
   }

    else if (weatherData.current.weather_code >= 45 && weatherData.current.weather_code <= 48) {
    
    weather.textContent = `Weather: Fog`;
   }

   else if (weatherData.current.weather_code >= 51 && weatherData.current.weather_code <= 57) {
    
    weather.textContent = `Weather: Drizzle`;
   }

   else if (weatherData.current.weather_code >= 61 && weatherData.current.weather_code <= 67) {
    
    weather.textContent = `Weather: Rain`;
   }

   else if (weatherData.current.weather_code >= 71 && weatherData.current.weather_code <= 77) {
    
    weather.textContent = `Weather: Snow`;
   }

   else if (weatherData.current.weather_code >= 80 && weatherData.current.weather_code <= 82) {
    
    weather.textContent = `Weather: Rain showers`;
   } 
   else if (weatherData.current.weather_code === 95) {

    weather.textContent = `Weather: Thunderstorm`;
   } else {
     weather.textContent = `Weather: Not found `
   }

   return cityContent

    } catch(error) {
        throw error
    }

    
}

const today = new Date();

const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
});

console.log(formattedDate);

date.textContent = formattedDate;

