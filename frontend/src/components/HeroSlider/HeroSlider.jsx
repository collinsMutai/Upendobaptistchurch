import { useEffect, useState } from "react";
import "./HeroSlider.css";
import heroImage1 from "../../images/hero_slider1.png";
import heroImage2 from "../../images/hero_slider2.jpg";
import heroImage3 from "../../images/hero_slider3.jpg";

const slides = [
  {
    image: heroImage3,
    title: "Welcome to Glory Church Litein",
    subtitle: "Encounter God • Grow in Faith • Impact the World",
  },
  {
    image: heroImage1,
    title: "Glory Church Litein",
    subtitle: "A Place of Worship, Word, and Transformation",
  },
  {
    image: heroImage2,
    title: "Experiencing God’s Glory",
    subtitle: "Raising Lives Through Christ in Litein",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="overlay">
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
            <button
              className="hero-btn"
              onClick={() => (window.location.href = "/contact")}
            >
              Join Us This Sunday
            </button>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="indicators">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`indicator ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

      {/* Navigation */}
      <button className="nav prev" onClick={prevSlide}>❮</button>
      <button className="nav next" onClick={nextSlide}>❯</button>
    </section>
  );
};

export default HeroSlider;
