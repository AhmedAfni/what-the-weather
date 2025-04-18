function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const apiKey = '2db331906cef4acdbab31912251804';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    const weatherDiv = document.getElementById('weather');
    const errorText = document.getElementById('error');
    const loading = document.getElementById('loading');
    
    weatherDiv.classList.add('d-none');
    errorText.classList.add('d-none');
    loading.classList.remove('d-none');

    fetch(url)
    .then(res => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Invalid API key. Please check your API key.');
        } else if (res.status === 404) {
          throw new Error('City not found. Please check the city name and try again.');
        } else {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
      }
      return res.json();
    })
    .then(data => {
      if (!data || !data.current) {
        throw new Error('Invalid data received from the server');
      }
      
      document.getElementById('cityName').textContent = `${data.location.name}, ${data.location.country}`;
      document.getElementById('temp').textContent = `🌡️ ${Math.round(data.current.temp_c)} °C`;
      document.getElementById('condition').textContent = data.current.condition.text;
      document.getElementById('weatherIcon').src = data.current.condition.icon;
      document.getElementById('humidity').textContent = `${data.current.humidity}%`;
      document.getElementById('wind').textContent = `${data.current.wind_kph} km/h`;
      document.getElementById('pressure').textContent = `${data.current.pressure_mb} hPa`;

      weatherDiv.classList.remove('d-none');
    })
    .catch(err => {
      errorText.textContent = err.message;
      errorText.classList.remove('d-none');
    })
    .finally(() => {
      loading.classList.add('d-none');
    });
}