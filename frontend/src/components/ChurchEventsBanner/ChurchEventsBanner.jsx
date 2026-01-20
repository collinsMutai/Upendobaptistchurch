import { useState, useEffect } from "react";
import "./ChurchEventsBanner.css";

const ChurchEventsBanner = () => {
  // Countdown Logic
  const calculateTimeLeft = () => {
    const eventDate = new Date("2026-03-24T09:00:00"); // Set your event date here
    const now = new Date();
    const difference = eventDate - now;

    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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
        <span className="event-day">{timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}</span>
        <span className="event-month">MAR</span>
      </div>

      {/* Column 2 – Event Preview */}
      <div className="event-col preview-col">
        <h3>Sunday Worship Service</h3>
        <p>Join us for a powerful time of worship, prayer, and teaching.</p>
      </div>

      {/* Column 3 – Timer (Clock Style) */}
      <div className="event-col timer-col">
        <div className="timer-box clock-style">
          <div className="time-unit">
            <span>{timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}</span>
            <small>Days</small>
          </div>

          <div className="clock-dots">
            <span></span>
            <span></span>
          </div>

          <div className="time-unit">
            <span>{timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}</span>
            <small>Hrs</small>
          </div>

          <div className="clock-dots">
            <span></span>
            <span></span>
          </div>

          <div className="time-unit">
            <span>{timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}</span>
            <small>Min</small>
          </div>

          <div className="clock-dots">
            <span></span>
            <span></span>
          </div>

          <div className="time-unit">
            <span>{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span>
            <small>Sec</small>
          </div>
        </div>
      </div>

      {/* Column 4 – Button */}
      <div className="event-col button-col">
        <button className="all-events-btn">All Events</button>
      </div>

    </section>
  );
};

export default ChurchEventsBanner;
