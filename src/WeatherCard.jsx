// src/WeatherCard.jsx
export function WeatherCard({ current }) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold">{current.datetime}</h2>
        <p className="text-lg">{current.conditions}</p>
        <p>🌡 Temp: {current.temp}°C</p>
        <p>💨 Viento: {current.windspeed} km/h</p>
        <p>🌧 Prob. lluvia: {current.precipprob || 0}%</p>
      </div>

      
    );
  }
  