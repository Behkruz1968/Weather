import React, { useState } from 'react';

const CityInput = ({ setCity, setLocation }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(inputValue.trim());
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await setLocation({ lat: latitude, lon: longitude });
        },
        (error) => console.error(error)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter city name"
          className="p-3 w-3/4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 text-gray-700"
        />
        <button
          type="submit"
          className="bg-teal-500 text-white p-3 w-1/4 rounded-r-lg hover:bg-teal-600 transition"
        >
          Search
        </button>
      </div>
      <button
        type="button"
        onClick={handleLocationClick}
        className="bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition"
      >
        Use Current Location
      </button>
    </form>
  );
};

export default CityInput;
