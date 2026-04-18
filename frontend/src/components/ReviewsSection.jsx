import "../styles/reviews.css";

export default function ReviewsSection({ product }) {
  const reviews = [
    {
      id: 1,
      author: "Emma Davis",
      rating: 5,
      title: "Absolutely Perfect",
      text: "The quality is incredible. Exactly what I was looking for.",
      verified: true,
      date: "2024-03-15",
    },
    {
      id: 2,
      author: "James Wilson",
      rating: 4,
      title: "Great Fit",
      text: "Amazing product, fits perfectly. Highly recommend!",
      verified: true,
      date: "2024-03-10",
    },
    {
      id: 3,
      author: "Sophie Turner",
      rating: 5,
      title: "Premium Quality",
      text: "Worth every penny. Fast shipping too!",
      verified: true,
      date: "2024-03-05",
    },
  ];

  return (
    <section className="reviews-section">
      <h3>Customer Reviews</h3>

      <div className="reviews-summary">
        <div className="rating-summary">
          <div className="large-rating">
            <span className="rating-number">{product.rating}</span>
            <div className="stars">{"★".repeat(5)}</div>
            <p className="review-count">Based on {product.reviews} reviews</p>
          </div>
        </div>

        <button className="btn btn-primary">Write a Review</button>
      </div>

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="review-author">
                <strong>{review.author}</strong>
                {review.verified && (
                  <span className="verified-badge">✓ Verified</span>
                )}
              </div>
              <div className="review-date">
                {new Date(review.date).toLocaleDateString()}
              </div>
            </div>
            <div className="review-rating">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>
            <h4>{review.title}</h4>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
