import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

export default function CalendarWidget() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // First day of month (0-6)
  const firstDayIndex = new Date(year, month, 1).getDay();
  // Days in previous month
  const prevDaysInMonth = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Generate calendar days
  const calendarDays = [];
  
  // Previous month padding days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevDaysInMonth - i,
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
    });
  }

  // Next month padding days
  const totalSlots = 42; // 6 rows of 7 days
  const nextMonthDaysCount = totalSlots - calendarDays.length;
  for (let i = 1; i <= nextMonthDaysCount; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
    });
  }

  // Mock events for Dhanush
  const mockEvents = [
    { time: "10:00 AM", title: "Daily Standup Meeting", type: "work" },
    { time: "1:30 PM", title: "Review Portfolio PRs", type: "code" },
    { time: "3:00 PM", title: "Portfolio Walkthrough", type: "meeting" },
  ];

  return (
    <div
      style={{
        background: "rgba(28,28,30,0.75)",
        backdropFilter: "blur(48px) saturate(190%)",
        WebkitBackdropFilter: "blur(48px) saturate(190%)",
        border: "0.5px solid rgba(255,255,255,0.13)",
        borderRadius: 16,
        padding: "14px 16px",
        color: "white",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Calendar Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <CalendarIcon size={14} style={{ color: "#ff453a" }} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Calendar</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>
            {monthNames[month]} {year}
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            <button
              onClick={handlePrevMonth}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "none",
                borderRadius: 4,
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
              }}
            >
              <ChevronLeft size={12} />
            </button>
            <button
              onClick={handleNextMonth}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "none",
                borderRadius: 4,
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
              }}
            >
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Weekdays Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", marginBottom: 6 }}>
        {dayNames.map((day) => (
          <span key={day} style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)" }}>
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px 2px", textAlign: "center", marginBottom: 12 }}>
        {calendarDays.map((slot, index) => {
          const currentIsToday = slot.isCurrentMonth && isToday(slot.day);
          return (
            <div
              key={index}
              style={{
                fontSize: 11,
                fontWeight: currentIsToday ? "700" : "500",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 22,
                borderRadius: "50%",
                color: currentIsToday
                  ? "white"
                  : slot.isCurrentMonth
                  ? "white"
                  : "rgba(255,255,255,0.2)",
                background: currentIsToday ? "#ff453a" : "transparent",
              }}
            >
              {slot.day}
            </div>
          );
        })}
      </div>

      {/* Upcoming Events */}
      {month === today.getMonth() && year === today.getFullYear() && (
        <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.1)", paddingTop: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 6, letterSpacing: 0.5 }}>
            Upcoming Today
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {mockEvents.map((evt, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(255,255,255,0.04)",
                  padding: "5px 8px",
                  borderRadius: 6,
                  borderLeft: `3px solid ${
                    evt.type === "work" ? "#007aff" : evt.type === "code" ? "#34c759" : "#af52de"
                  }`,
                }}
              >
                <span style={{ fontSize: 11, color: "white", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginRight: 8 }}>
                  {evt.title}
                </span>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>
                  {evt.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
