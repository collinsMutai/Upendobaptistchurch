import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ChurchEventsBanner.css";

const ChurchEventsBanner = () => {
  const navigate = useNavigate();
  const events = useSelector((state) => state.events.list); // Get events from Redux

  const monthMap = {
    JAN: 0,
    FEB: 1,
    MAR: 2,
    APR: 3,
    MAY: 4,
    JUN: 5,
    JUL: 6,
    AUG: 7,
    SEP: 8,
    OCT: 9,
    NOV: 10,
    DEC: 11,
  };

  // Find next upcoming event
  const parseEventDate = (event) => {
    const month = monthMap[event.month.toUpperCase()];
    const day = parseInt(event.day, 10);

    let [time, modifier] = event.time.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return new Date(2026, month, day, hours, minutes);
  };

  const nextEvent = events
    .filter((event) => parseEventDate(event) > new Date())
    .sort((a, b) => parseEventDate(a) - parseEventDate(b))[0];

  // Countdown logic
  const calculateTimeLeft = () => {
    if (!nextEvent) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const now = new Date();
    const difference = parseEventDate(nextEvent) - now;

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const totalSeconds = Math.floor(difference / 1000);
    return {
      days: Math.floor(totalSeconds / (24 * 3600)),
      hours: Math.floor((totalSeconds % (24 * 3600)) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [nextEvent]);

  if (!nextEvent) return null; // No upcoming events

  const units = ["days", "hours", "minutes", "seconds"];

  return (
    <section className="events-banner">
      {/* Column 1 – Date */}
      <div className="event-col date-col">
        <span className="event-day">
          {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
        </span>
        <span className="event-month">{nextEvent.month}</span>
      </div>

      {/* Column 2 – Event Preview */}
      <div className="event-col preview-col">
        <h3>{nextEvent.title}</h3>
        <p>{nextEvent.description}</p>
        <div className="event-meta">
          <span className="event-time">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 13a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M12 10l0 3l2 0" />
              <path d="M7 4l-2.75 2" />
              <path d="M17 4l2.75 2" />
            </svg>
            <span>{nextEvent.time}</span>
          </span>

          <span className="event-location">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
              <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0" />
            </svg>
            <span>{nextEvent.location}</span>
          </span>
        </div>
      </div>

      {/* Column 3 – Timer with redesigned clock */}
      <div className="event-col timer-col">
        <div className="timer-box clock-style">
          {units.map((unit, index) => (
            <div key={unit} className="time-unit-wrapper">
              <div className="time-unit">
                <span>
                  {timeLeft[unit] < 10 ? `0${timeLeft[unit]}` : timeLeft[unit]}
                </span>
                <small>
                  {unit === "days"
                    ? "DAYS"
                    : unit === "hours"
                      ? "HRS"
                      : unit === "minutes"
                        ? "MINS"
                        : "SECS"}
                </small>
              </div>
              {/* Remove clock dots if you want, but keeping for now */}
              {index < units.length - 1 && (
                <div className="clock-dots">
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Column 4 – Button */}
      <div className="event-col button-col">
        <button onClick={() => navigate("/events")} className="all-events-btn">
          All Events
        </button>
      </div>
    </section>
  );
};

export default ChurchEventsBanner;
