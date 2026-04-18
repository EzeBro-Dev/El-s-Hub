import { Link } from "react-router-dom";
import "../styles/product-card.css";

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) {
  // Get gender-specific image or fallback to regular image
  const displayImage = product.genderImages
    ? product.genderImages[product.gender] || product.image
    : product.image;

  const displayImage2 = product.genderImages
    ? product.genderImages[product.gender] || product.image2
    : product.image2;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img src={displayImage} alt={product.name} className="product-image" />
        <img
          src={displayImage2}
          alt={`${product.name} Alt`}
          className="product-image-hover"
        />
        <div className="product-tags">
          {product.isNew && <span className="tag tag-new">New</span>}
          {product.isSale && <span className="tag tag-sale">Sale</span>}
        </div>
      </Link>

      <div className="product-info">
        <h3>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="price-section">
          {product.isSale ? (
            <>
              <span className="original-price">${product.originalPrice}</span>
              <span className="price">${product.price}</span>
            </>
          ) : (
            <span className="price">${product.price}</span>
          )}
        </div>
        <div className="rating">
          <span className="stars">★★★★★</span>
          <span className="review-count">({product.reviews})</span>
        </div>
      </div>

      <div className="product-hover-actions">
        <button
          className="wishlist-btn"
          onClick={() => onToggleWishlist(product)}
          title="Add to Wishlist"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isWishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <Link
          to={`/product/${product.id}`}
          className="btn btn-small btn-primary"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
