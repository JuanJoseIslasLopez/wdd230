// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Define the URL for the OpenWeatherMap API request with Trier’s coordinates and your API key
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=79dbab3e43d026674e2f87b0efd7e711';

// Fetch data from the OpenWeatherMap API
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // Testing only
      displayResults(data); // Display the fetched data
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// Function to display the results on the HTML page
function displayResults(data) {
  // Display current temperature
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;

  // Get the icon and description for the weather
  const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const desc = data.weather[0].description;

  // Set image attributes and description
  weatherIcon.setAttribute('src', iconSrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = `${desc}`;
}

// Call the apiFetch function to fetch and display the weather data
apiFetch();
