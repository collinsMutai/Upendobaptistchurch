import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ChurchEventsBanner.css";

const ChurchEventsBanner = () => {
  const navigate = useNavigate();
  // Countdown Logic
  const calculateTimeLeft = () => {
    const eventDate = new Date("2026-03-24T09:00:00"); // Set your event date here
    const now = new Date();
    const difference = eventDate - now;

    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return (
    <section className="events-banner">
      {/* Column 1 – Date */}
      <div className="event-col date-col">
        <span className="event-day">
          {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
        </span>
        <span className="event-month">MAR</span>
      </div>

      {/* Column 2 – Event Preview */}
      <div className="event-col preview-col">
        <h3>Sunday Worship Service</h3>
        <p>Join us for a powerful time of worship, prayer, and teaching.</p>
        {/* Start Time & Location */}
        {/* Start Time & Location */}
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
            <span>9:00 AM</span>
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
            <span>Main Sanctuary</span>
          </span>
        </div>
      </div>

      {/* Column 3 – Timer (Clock Style) */}
      <div className="event-col timer-col">
        <div className="timer-box clock-style">
          <div className="time-unit">
            <span>
              {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
            </span>
            <small>Days</small>
          </div>

          <div className="clock-dots">
            <span></span>
            <span></span>
          </div>

          <div className="time-unit">
            <span>
              {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
            </span>
            <small>Hrs</small>
          </div>

          <div className="clock-dots">
            <span></span>
            <span></span>
          </div>

          <div className="time-unit">
            <span>
              {timeLeft.minutes < 10
                ? `0${timeLeft.minutes}`
                : timeLeft.minutes}
            </span>
            <small>Min</small>
          </div>

          <div className="clock-dots">
            <span></span>
            <span></span>
          </div>

          <div className="time-unit">
            <span>
              {timeLeft.seconds < 10
                ? `0${timeLeft.seconds}`
                : timeLeft.seconds}
            </span>
            <small>Sec</small>
          </div>
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
