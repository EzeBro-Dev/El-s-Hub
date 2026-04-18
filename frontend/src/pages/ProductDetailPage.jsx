import { useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import ReviewsSection from "../components/ReviewsSection";
import { useProducts } from "../hooks/useProducts";
import "../styles/page-product.css";

export default function ProductDetailPage({
  addToCart,
  toggleWishlist,
  wishlist,
}) {
  const { id } = useParams();
  const { products, getProductById } = useProducts();
  const product = getProductById(id);

  // Extract unique sizes and colors from variants (for backend compatibility)
  const getAvailableSizes = () => {
    if (product?.sizes) return product.sizes; // Use mock data if available
    if (product?.variants && Array.isArray(product.variants)) {
      return [...new Set(product.variants.map((v) => v.size))];
    }
    return [];
  };

  const getAvailableColors = () => {
    if (product?.colors) return product.colors; // Use mock data if available
    if (product?.variants && Array.isArray(product.variants)) {
      return [...new Set(product.variants.map((v) => v.color))];
    }
    return [];
  };

  const getVariantStock = (size, color) => {
    if (!product?.variants) return null;
    const variant = product.variants.find(
      (v) => v.size === size && v.color === color,
    );
    return variant?.stock || 0;
  };

  const availableSizes = getAvailableSizes();
  const availableColors = getAvailableColors();

  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(availableColors[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="container py-4">
        <p>Product not found</p>
      </div>
    );
  }

  const isWishlisted = wishlist.some((p) => p.id === product.id);

  // Get gender-specific images
  const displayImage = product.genderImages
    ? product.genderImages[product.gender] || product.image
    : product.image;

  const displayImage2 = product.genderImages
    ? product.genderImages[product.gender] || product.image2
    : product.image2;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart({
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity: parseInt(quantity),
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main className="container py-4">
      <div className="product-detail-layout">
        {/* Image Gallery */}
        <div className="product-gallery">
          <div className="main-image">
            <img
              src={mainImage === 0 ? displayImage : displayImage2}
              alt={product.name}
            />
          </div>
          <div className="thumbnail-images">
            <img
              src={displayImage}
              alt="View 1"
              className={`thumbnail ${mainImage === 0 ? "active" : ""}`}
              onClick={() => setMainImage(0)}
            />
            <img
              src={displayImage2}
              alt="View 2"
              className={`thumbnail ${mainImage === 1 ? "active" : ""}`}
              onClick={() => setMainImage(1)}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="product-details">
          <div className="product-header">
            <h1>{product.name}</h1>
            <div className="product-rating">
              <span className="stars">
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </span>
              <span className="rating-text">({product.reviews} reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="price-section">
            {product.isSale ? (
              <>
                <span className="original-price">${product.originalPrice}</span>
                <span className="price">${product.price}</span>
                <span className="discount-badge">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100,
                  )}
                  % OFF
                </span>
              </>
            ) : (
              <span className="price">${product.price}</span>
            )}
          </div>

          <p className="description">{product.description}</p>

          {/* Size Selector */}
          <div className="form-group">
            <label htmlFor="size">Size</label>
            <div className="sizes-grid">
              {availableSizes.map((size) => {
                const stock = getVariantStock(size, selectedColor);
                const outOfStock = product?.variants && stock === 0;
                return (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? "selected" : ""} ${outOfStock ? "disabled" : ""}`}
                    onClick={() => setSelectedSize(size)}
                    disabled={outOfStock}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Selector */}
          <div className="form-group">
            <label>Color: {selectedColor}</label>
            <div className="colors-grid">
              {availableColors.map((color) => {
                const stock = getVariantStock(selectedSize, color);
                const outOfStock = product?.variants && stock === 0;
                return (
                  <button
                    key={color}
                    className={`color-btn ${selectedColor === color ? "selected" : ""} ${outOfStock ? "disabled" : ""}`}
                    onClick={() => setSelectedColor(color)}
                    disabled={outOfStock}
                    title={color}
                  />
                );
              })}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value || 1)))
                }
              />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className={`btn btn-primary ${addedToCart ? "added" : ""}`}
              onClick={handleAddToCart}
            >
              {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
            </button>
            <button
              className={`btn-icon wishlist-btn ${isWishlisted ? "added" : ""}`}
              onClick={() => toggleWishlist(product)}
              title="Add to Wishlist"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={isWishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          {/* Info */}
          <div className="product-info-box">
            <div className="info-item">
              <span className="icon">🚚</span>
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="info-item">
              <span className="icon">↩️</span>
              <span>30-day easy returns</span>
            </div>
            <div className="info-item">
              <span className="icon">🔒</span>
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <ReviewsSection product={product} />

      {/* Related Products */}
      <RelatedProducts
        products={products}
        relatedIds={product.relatedProducts}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        wishlisted={wishlist}
      />
    </main>
  );
}
