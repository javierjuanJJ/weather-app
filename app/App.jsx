// src/App.jsx
import { useState, useEffect } from 'react';
import { fetchWeather } from './api';
import { WeatherCard } from './WeatherCard';

export default function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!location) return;
    try {
      setLoading(true);
      setError('');
      const data = await fetchWeather(location);
      setWeather(data);
    } catch (err) {
      setError(err.message || 'Error al obtener clima');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Default: obtener clima actual
    navigator.geolocation?.getCurrentPosition(async (pos) => {
      const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
      try {
        const data = await fetchWeather(coords);
        setWeather(data);
        setLocation(data.resolvedAddress);
      } catch { }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-blue-300">
      <h1 className="text-3xl font-bold mb-4">🌦 Weather App</h1>
      <div className="mb-4 flex gap-2">
        <input
          className="p-2 rounded border"
          placeholder="Ingresa ciudad"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSearch}>
          Buscar
        </button>
      </div>
      {loading && <p>Cargando clima...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weather && <WeatherCard current={weather.currentConditions} />}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
        {weather.days[0].hours.map((hour) => (
          <div key={hour.datetime} className="bg-white p-2 rounded shadow text-sm">
            <p>{hour.datetime}</p>
            <p>{hour.temp}°C</p>
            <p>{hour.conditions}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
