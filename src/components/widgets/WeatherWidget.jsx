import React from "react";
import { Sun, CloudSun, CloudRain, Wind } from "lucide-react";

export default function WeatherWidget() {
  // Mock weather data
  const weather = {
    city: "Mumbai",
    temp: "29°C",
    condition: "Light Rain",
    high: "32°",
    low: "26°",
    humidity: "82%",
    wind: "18 km/h",
    forecast: [
      { time: "Now", temp: "29°", icon: "rain" },
      { time: "4 PM", temp: "30°", icon: "rain" },
      { time: "7 PM", temp: "28°", icon: "cloud" },
      { time: "10 PM", temp: "27°", icon: "rain" },
    ],
  };

  const getIcon = (name, size = 18) => {
    switch (name) {
      case "sun":
        return <Sun size={size} style={{ color: "#ffb800" }} />;
      case "cloud-sun":
        return <CloudSun size={size} style={{ color: "#ffcc00" }} />;
      case "rain":
        return <CloudRain size={size} style={{ color: "#00a2ff" }} />;
      default:
        return <CloudSun size={size} style={{ color: "#cbd5e1" }} />;
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(44, 122, 237, 0.45) 0%, rgba(28, 28, 30, 0.8) 100%)",
        backdropFilter: "blur(48px) saturate(190%)",
        WebkitBackdropFilter: "blur(48px) saturate(190%)",
        border: "0.5px solid rgba(255,255,255,0.15)",
        borderRadius: 16,
        padding: "14px 16px",
        color: "white",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Top Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{weather.city}</div>
          <div style={{ fontSize: 32, fontWeight: 300, margin: "2px 0 0 0", lineHeight: 1 }}>{weather.temp}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 500, marginTop: 4 }}>
            {weather.condition}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          {getIcon("rain", 38)}
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 6, fontWeight: 500 }}>
            H: {weather.high}  L: {weather.low}
          </div>
        </div>
      </div>

      {/* Info Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: "rgba(255,255,255,0.06)",
          borderRadius: 8,
          padding: "6px 10px",
          marginBottom: 10,
          fontSize: 10,
          color: "rgba(255,255,255,0.8)",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Wind size={10} style={{ color: "rgba(255,255,255,0.5)" }} />
          Wind: {weather.wind}
        </span>
        <span>Humidity: {weather.humidity}</span>
      </div>

      {/* Forecast Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, textAlign: "center" }}>
        {weather.forecast.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "rgba(0,0,0,0.15)",
              borderRadius: 8,
              padding: "6px 2px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{item.time}</span>
            {getIcon(item.icon, 14)}
            <span style={{ fontSize: 10, fontWeight: 600 }}>{item.temp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
