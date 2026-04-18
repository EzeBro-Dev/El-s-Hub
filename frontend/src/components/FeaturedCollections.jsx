import { Link } from "react-router-dom";
import "../styles/collections.css";

export default function FeaturedCollections() {
  const collections = [
    {
      id: 1,
      title: "Summer Drop",
      subtitle: "Light Fabrics & Vibrant Styles",
      image: "https://picsum.photos/600/600?random=summer",
      link: "/shop",
    },
    {
      id: 2,
      title: "Streetwear Essentials",
      subtitle: "Urban Minimalism",
      image: "https://picsum.photos/600/600?random=street",
      link: "/shop",
    },
    {
      id: 3,
      title: "Luxury Accessories",
      subtitle: "Elevate Your Look",
      image: "https://picsum.photos/600/600?random=luxury",
      link: "/shop",
    },
    {
      id: 4,
      title: "Tailored Elegance",
      subtitle: "Refined & Sophisticated",
      image: "https://picsum.photos/600/600?random=tailored",
      link: "/shop",
    },
  ];

  return (
    <section className="featured-collections">
      <div className="container">
        <h2>Featured Collections</h2>
        <div className="collections-grid">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={collection.link}
              className="collection-card"
            >
              <div className="collection-image">
                <img src={collection.image} alt={collection.title} />
              </div>
              <div className="collection-content">
                <h3>{collection.title}</h3>
                <p>{collection.subtitle}</p>
                <span className="view-link">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
