import Hero from "../components/Hero";
import FeaturedCollections from "../components/FeaturedCollections";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../hooks/useProducts";
import "../styles/page-home.css";

export default function HomePage({ addToCart, toggleWishlist, wishlist }) {
  const { products, loading } = useProducts();
  const featuredProducts = products.filter((p) => p.isNew).slice(0, 8);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <main>
      <Hero />
      <FeaturedCollections />

      <section className="new-arrivals-section">
        <div className="container">
          <h2>New Arrivals</h2>
          <ProductGrid
            products={featuredProducts}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlisted={wishlist}
          />
          <div className="text-center mt-4">
            <a href="/shop" className="btn btn-secondary">
              View All Products
            </a>
          </div>
        </div>
      </section>

      <section className="instagram-section">
        <div className="container">
          <h2>Shop The Look</h2>
          <p className="text-center text-muted mb-4">
            Follow us on Instagram @elsshub
          </p>
          <div className="instagram-grid">
            {[
              "https://picsum.photos/300/300?random=1",
              "https://picsum.photos/300/300?random=2",
              "https://picsum.photos/300/300?random=3",
              "https://picsum.photos/300/300?random=4",
              "https://picsum.photos/300/300?random=5",
              "https://picsum.photos/300/300?random=6",
            ].map((src, index) => (
              <div key={index} className="instagram-item">
                <img src={src} alt={`Instagram ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
