// src/api.js
const API_KEY = 'TU_API_KEY'; // reemplaza con tu key real

export async function fetchWeather(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("No se pudo obtener el clima");

  const data = await res.json();
  return data;
}
