import { Link } from "react-router-dom";
import "../styles/hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <img
          src="https://picsum.photos/1200/600?random=hero"
          alt="Fashion Hero"
          className="hero-image"
        />
        <div className="hero-overlay"></div>
        <div className="hero-text">
          <h1>Redefine Your Style</h1>
          <p>Premium sustainable fashion for the modern individual</p>
          <div className="hero-buttons">
            <Link to="/shop?gender=men" className="btn btn-primary">
              Shop Men
            </Link>
            <Link to="/shop?gender=women" className="btn btn-secondary">
              Shop Women
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
