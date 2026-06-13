import React from "react";
import { Sun, CloudSun, CloudRain, Wind } from "lucide-react";
import useNotificationStore from "#store/notification";

export default function WeatherWidget() {
  const { darkMode } = useNotificationStore();
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
        return <CloudSun size={size} style={{ color: darkMode ? "#cbd5e1" : "#4b5563" }} />;
    }
  };

  const widgetBg = darkMode
    ? "linear-gradient(135deg, rgba(44, 122, 237, 0.45) 0%, rgba(28, 28, 30, 0.8) 100%)"
    : "linear-gradient(135deg, rgba(135, 206, 250, 0.6) 0%, rgba(240, 240, 245, 0.85) 100%)";
  const widgetBorder = darkMode ? "0.5px solid rgba(255,255,255,0.15)" : "0.5px solid rgba(0,0,0,0.12)";
  const textColor = darkMode ? "white" : "#1c1c1e";
  const subTextColor = darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";
  const infoRowBg = darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const infoRowText = darkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)";
  const forecastBg = darkMode ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.5)";
  const forecastTimeColor = darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";

  return (
    <div
      style={{
        background: widgetBg,
        backdropFilter: "blur(48px) saturate(190%)",
        WebkitBackdropFilter: "blur(48px) saturate(190%)",
        border: widgetBorder,
        borderRadius: 16,
        padding: "14px 16px",
        color: textColor,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Top Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{weather.city}</div>
          <div style={{ fontSize: 32, fontWeight: 300, margin: "2px 0 0 0", lineHeight: 1 }}>{weather.temp}</div>
          <div style={{ fontSize: 11, color: subTextColor, fontWeight: 500, marginTop: 4 }}>
            {weather.condition}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          {getIcon("rain", 38)}
          <div style={{ fontSize: 10, color: subTextColor, marginTop: 6, fontWeight: 500 }}>
            H: {weather.high}  L: {weather.low}
          </div>
        </div>
      </div>

      {/* Info Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: infoRowBg,
          borderRadius: 8,
          padding: "6px 10px",
          marginBottom: 10,
          fontSize: 10,
          color: infoRowText,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Wind size={10} style={{ color: darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)" }} />
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
              background: forecastBg,
              borderRadius: 8,
              padding: "6px 2px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span style={{ fontSize: 9, color: forecastTimeColor, fontWeight: 600 }}>{item.time}</span>
            {getIcon(item.icon, 14)}
            <span style={{ fontSize: 10, fontWeight: 600 }}>{item.temp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
