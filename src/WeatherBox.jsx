import React, { useState } from 'react';

const WeatherBox = ({ date, weather_desc, icon, temp, fullDayForecast }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div
        className="bg-gradient-to-br from-teal-200 to-blue-400 p-4 rounded-lg shadow-lg text-center cursor-pointer transition-transform transform hover:scale-105"
        onClick={toggleModal}
      >
        <p className="text-white text-sm mb-1">{formatDate(date)}</p>
        <img
          className="w-16 h-16 mx-auto mb-2"
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt={weather_desc}
        />
        <p className="text-white text-md capitalize mb-1">{weather_desc}</p>
        <p className="text-white text-3xl font-bold">{temp}°C</p>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-2xl font-bold mb-2">{formatDate(date)}</h2>
            <img
              className="w-24 h-24 mx-auto mb-2"
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={weather_desc}
            />
            <p className="text-xl capitalize mb-2">{weather_desc}</p>
            <p className="text-4xl font-bold">{temp}°C</p>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Full Day Forecast</h3>
              <pre className="text-sm text-gray-700">{fullDayForecast}</pre>
            </div>
            <button
              className="mt-4 bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherBox;
