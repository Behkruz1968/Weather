import React from 'react';

const MainWeatherWindow = ({ data, city }) => {
  return (
    <div className="text-white text-center mb-6">
      {city && data ? (
        <div>
          <h1 className="text-4xl font-bold mb-4">{city}</h1>
          <p className="text-lg mb-2">{data.date}</p>
          <img
            className="w-20 h-20 mx-auto mb-4"
            src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt={data.weather_desc}
          />
          <p className="capitalize text-xl">{data.weather_desc}</p>
          <p className="text-5xl font-light">{data.temp}°C</p>
        </div>
      ) : (
        <h1 className="text-2xl font-semibold">Enter a city to get started</h1>
      )}
    </div>
  );
};

export default MainWeatherWindow;
