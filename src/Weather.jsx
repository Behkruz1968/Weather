import React from 'react';

const WeatherBox = ({ date, weather_desc, icon, temp }) => {
  return (
    <div className="weather-box bg-white bg-opacity-60 p-4 rounded-lg shadow-md text-center">
      <p className="text-gray-800 text-lg mb-2">{date}</p>
      <img
        className="w-12 h-12 mx-auto mb-2"
        src={`http://openweathermap.org/img/wn/${icon}.png`}
        alt={weather_desc}
      />
      <p className="text-gray-800 capitalize">{weather_desc}</p>
      <p className="text-gray-800 text-2xl font-light">{temp}°C</p>
    </div>
  );
};

export default WeatherBox;
