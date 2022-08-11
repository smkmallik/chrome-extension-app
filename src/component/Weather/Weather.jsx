import axios from 'axios';
import { useEffect, useState } from 'react';
import './Weather.css';

const Weather = () => {

    const [coordinates, setCoordinates] = useState({
      latitude: 0,
      longitude: 0,
    })
    const [weather, setWeather] = useState(null)
    const [city, setCity] = useState(localStorage.getItem('city'))
    const [isInputVisible, setIsInputVisible] = useState(false)

    const getWeatherData = async() => {
        try {
            const response = coordinates.latitude !== 0 && (await axios.get(`https://api.openweathermap.org/data/2.5/weather?${
                city !== null ? `q=${city}` : `lat=${coordinates.latitude}&lon=${coordinates.longitude}`
            }&appid=f3b54ecb4e9937fcb8377bee47363beb`));

            setWeather({
                location: response.data.name,
                country: response.data.sys.country,
                weather: response.data.weather[0].main,
                weather_description: response.data.weather[0].description,
                icon: response.data.weather[0].icon,
                temperature: (response.data.main.temp - 273.15).toFixed(0),
                temperature_min: (response.data.main.temp_min - 273.15).toFixed(2),
                temperature_max: (response.data.main.temp_max - 273.15).toFixed(2),
                humidity: response.data.main.huminity,
                wind: response.data.wind.speed
            });
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        city!== null && localStorage.setItem("city", city, [city]);
    });

    useEffect(
      () =>
        navigator.geolocation.getCurrentPosition((x) =>
          setCoordinates({
            latitude: x.coords.latitude,
            longitude: x.coords.longitude,
          })
        ),
      []
    );

    useEffect(() => {
        getWeatherData();
    }, [coordinates, city]);

    return (
      <div
        className='weather-wrapper'
        onKeyDown={(e) => e.code === 'Enter' && setIsInputVisible(false)}
      >
        {weather !== null && (
          <div>
            <div className='temp-wrapper'>
              <img
                src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                width='50px'
                height='50px'
                alt='weather-icon'
              />
              {weather.temperature}°C
            </div>
            {
                isInputVisible && (
                    <input 
                        type="text"
                        className='city-search'
                        placeholder='Enter city name'
                        onKeyDown={(e) => e.code === "Enter" && setCity(e.target.value)}
                    />
                )
            }
            {weather.location}
          </div>
        )}
        <button
            onClick={() => setIsInputVisible(true)}
        >
            Change City
        </button>
      </div>
    )
}

export { Weather };