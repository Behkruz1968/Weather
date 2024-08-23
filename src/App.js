import React, { useState, useEffect, useMemo } from 'react';
import MainWeatherWindow from './MainWeatherWindow';
import CityInput from './CityInput';
import WeatherBox from './WeatherBox';

const App = () => {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState(null);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const fetchWeatherData = async (city, location) => {
    setLoading(true);
    try {
      const apiKey = '48da77127ab0a74a81ce2868c5ea153a';
      let url;

      if (location) {
        const { lat, lon } = location;
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === '200') {
        const dayIndices = getDayIndices(data);
        const days = dayIndices.map((index) => {
          const fullDayForecast = data.list
            .filter((item) => item.dt_txt.startsWith(data.list[index].dt_txt.slice(0, 10)))
            .map((item) => {
              return `${item.dt_txt.slice(11, 16)}: ${Math.round(item.main.temp)}°C, ${item.weather[0].description}`;
            })
            .join('\n');
          
          return {
            date: new Date(data.list[index].dt * 1000).toLocaleDateString(),
            weather_desc: data.list[index].weather[0].description,
            icon: data.list[index].weather[0].icon,
            temp: Math.round(data.list[index].main.temp),
            fullDayForecast,
          };
        });
        setDays(days);
      } else {
        console.error('City not found or API error');
        setDays([]);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setDays([]);
    } finally {
      setLoading(false);
    }
  };

  const getDayIndices = (data) => {
    let dayIndices = [];
    let index = 0;
    let currentDay = data.list[0].dt_txt.slice(8, 10);
    dayIndices.push(index);

    for (let i = 1; i < 5; i++) {
      while (
        index < data.list.length &&
        (data.list[index].dt_txt.slice(8, 10) === currentDay ||
          data.list[index].dt_txt.slice(11, 13) !== '12')
      ) {
        index++;
      }
      if (index < data.list.length) {
        currentDay = data.list[index].dt_txt.slice(8, 10);
        dayIndices.push(index);
      }
    }

    return dayIndices;
  };

  const handleCitySubmit = (newCity) => {
    setCity(newCity);
    setHistory((prevHistory) => [...new Set([newCity, ...prevHistory])]);
  };

  useEffect(() => {
    if (city || location) {
      fetchWeatherData(city, location);
    }
  }, [city, location]);

  const weatherBoxes = useMemo(() => {
    return days.slice(1).map((day, index) => (
      <WeatherBox key={index} {...day} />
    ));
  }, [days]);

  return (
    <div className="bg-gradient-to-r from-teal-400 to-blue-600 min-h-screen flex flex-col justify-center items-center p-6">
      <div className="max-w-4xl w-full bg-white bg-opacity-80 p-8 rounded-lg shadow-xl backdrop-blur-lg">
        <MainWeatherWindow data={days[0]} city={city} />
        <CityInput setCity={handleCitySubmit} setLocation={setLocation} />
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 border-4 border-t-4 border-teal-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {weatherBoxes}
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">Search History</h2>
              <ul>
                {history.map((item, index) => (
                  <li
                    key={index}
                    className="mb-1 text-blue-600 hover:underline cursor-pointer"
                    onClick={() => handleCitySubmit(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
