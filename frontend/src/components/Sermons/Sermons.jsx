import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import "./Sermons.css";

const Sermons = () => {
  const sermons = useSelector((state) => state.sermons.list);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date-asc");
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const [selectedSermon, setSelectedSermon] = useState(null); // <-- selected sermon for modal

  const getSermonDate = (sermon) => new Date(sermon.datetime);

  const filteredSermons = useMemo(
    () =>
      sermons.filter(
        (sermon) =>
          sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (sermon.preacher &&
            sermon.preacher.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (sermon.month &&
            sermon.month.toLowerCase().includes(searchTerm.toLowerCase())),
      ),
    [sermons, searchTerm],
  );

  const sortedSermons = useMemo(
    () =>
      filteredSermons.sort((a, b) => {
        switch (sortOption) {
          case "title-asc":
            return a.title.localeCompare(b.title);
          case "title-desc":
            return b.title.localeCompare(a.title);
          case "date-desc":
            return getSermonDate(b) - getSermonDate(a);
          case "date-asc":
          default:
            return getSermonDate(a) - getSermonDate(b);
        }
      }),
    [filteredSermons, sortOption],
  );

  const visibleSermons = sortedSermons.slice(0, visibleCount);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setLoading(false);
    }, 600);
  };

  return (
    <section className="sermons-page">
      <h2 className="sermons-title">Recent Sermons</h2>

      <div className="sort-controls">
        <input
          type="text"
          placeholder="Search by title, preacher, or month..."
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
          <option value="title-asc">Title (A → Z)</option>
          <option value="title-desc">Title (Z → A)</option>
        </select>
      </div>

      <div className="events-grid">
        {visibleSermons.length > 0 ? (
          visibleSermons.map((sermon) => (
            <div
              key={sermon.id}
              className="event-card"
              onClick={() => setSelectedSermon(sermon)} // <-- open modal
              style={{ cursor: "pointer" }}
            >
              <div className="event-image-wrapper">
                <img
                  src={sermon.image}
                  alt={sermon.title}
                  className="event-image"
                />
                <div className="event-date-badge">
                  <span className="event-day">{sermon.day}</span>
                  {sermon.month && (
                    <span className="event-month">{sermon.month}</span>
                  )}
                </div>
              </div>
              <div className="event-content">
                <h3>{sermon.title}</h3>
                <p>{sermon.description}</p>
                {sermon.preacher && (
                  <p>
                    <strong>Preacher:</strong> {sermon.preacher}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>
            No sermons found
          </p>
        )}
      </div>

      {visibleCount < sortedSermons.length && (
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

      {/* ================= Video Modal ================= */}
      {selectedSermon && (
        <div className="modal-overlay" onClick={() => setSelectedSermon(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedSermon(null)}
            >
              &times;
            </button>
            <h3>{selectedSermon.title}</h3>
            {selectedSermon.videoUrl ? (
              <iframe
                width="100%"
                height="400"
                src={`${selectedSermon.videoUrl}?autoplay=1&rel=0`}
                title={selectedSermon.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p>Video not available</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Sermons;
