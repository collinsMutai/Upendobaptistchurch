import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import "./Events.css";

const Events = () => {
  const events = useSelector((state) => state.events.list);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date-asc");
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(false);

  const getEventDate = (event) => {
    const year = new Date().getFullYear();
    return new Date(
      `${event.month || "Jan"} ${event.day || 1}, ${year} ${event.time || "00:00"}`
    );
  };

  // Recurring events to pin at top
  const pinnedEvents = events.filter((event) =>
    ["sunday worship service", "weekly prayer meeting"].includes(event.title.toLowerCase())
  );

  // Filter and sort other events
  const otherEvents = useMemo(
    () =>
      events
        .filter(
          (event) =>
            !["sunday worship service", "weekly prayer meeting"].includes(
              event.title.toLowerCase()
            )
        )
        .filter(
          (event) =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (event.month && event.month.toLowerCase().includes(searchTerm.toLowerCase()))
        ),
    [events, searchTerm]
  );

  const sortedOtherEvents = useMemo(() => {
    return otherEvents.sort((a, b) => {
      switch (sortOption) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "date-desc":
          return getEventDate(b) - getEventDate(a);
        case "date-asc":
        default:
          return getEventDate(a) - getEventDate(b);
      }
    });
  }, [otherEvents, sortOption]);

  // Combine pinned events + sorted other events
  const visibleEvents = [...pinnedEvents, ...sortedOtherEvents].slice(0, visibleCount);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setLoading(false);
    }, 600);
  };

  return (
    <section className="events-page">
      <h2 className="events-title">Upcoming Events</h2>

      <div className="sort-controls">
        <input
          type="text"
          placeholder="Search by name or month..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="event-search"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="date-asc">Date (Earliest → Latest)</option>
          <option value="date-desc">Date (Latest → Earliest)</option>
          <option value="title-asc">Name (A → Z)</option>
          <option value="title-desc">Name (Z → A)</option>
        </select>
      </div>

      <div className="events-grid">
        {visibleEvents.length > 0 ? (
          visibleEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image-wrapper">
                <img src={event.image} alt={event.title} className="event-image" />
                <div className="event-date-badge">
                  <span className="event-day">{event.day}</span>
                  {event.month && <span className="event-month">{event.month}</span>}
                </div>
              </div>

              <div className="event-content">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>
            No events found
          </p>
        )}
      </div>

      {visibleCount < sortedOtherEvents.length + pinnedEvents.length && (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button
            className="load-more-btn"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? <span className="spinner"></span> : "Load More"}
          </button>
        </div>
      )}
    </section>
  );
};

export default Events;
