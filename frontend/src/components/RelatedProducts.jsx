import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../styles/related-products.css";

export default function RelatedProducts({
  products,
  relatedIds,
  onAddToCart,
  onToggleWishlist,
  wishlisted = [],
}) {
  const related = products.filter((p) => relatedIds.includes(p.id)).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="related-products">
      <h3>You Might Also Like</h3>
      <div className="related-grid">
        {related.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            isWishlisted={wishlisted.some((p) => p.id === product.id)}
          />
        ))}
      </div>
    </section>
  );
}
