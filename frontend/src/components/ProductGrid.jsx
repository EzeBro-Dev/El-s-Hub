import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "../styles/product-grid.css";

export default function ProductGrid({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlisted = [],
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>No products found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isWishlisted={wishlisted.some((p) => p.id === product.id)}
        />
      ))}
    </div>
  );
}
