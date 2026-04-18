import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/page-checkout.css";

export default function CheckoutPage({ cart }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    cardName: "",
    cardNumber: "",
    cardExp: "",
    cardCVC: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <main className="container py-4">
        <div className="order-confirmation">
          <div className="success-icon">✓</div>
          <h1>Thank You for Your Order!</h1>
          <p>Your order #12345 has been confirmed</p>
          <p className="confirmation-text">
            A confirmation email has been sent to {formData.email}
          </p>
          <div className="order-details">
            <h3>Order Details</h3>
            <p>
              <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
            </p>
            <p>
              <strong>Shipping:</strong>{" "}
              {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            </p>
            <p>
              <strong>Tax:</strong> ${tax.toFixed(2)}
            </p>
            <p>
              <strong>Total:</strong> ${total.toFixed(2)}
            </p>
          </div>
          <Link to="/" className="btn btn-primary">
            Return to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <h1 className="mb-3">Checkout</h1>

      <div className="checkout-layout">
        {/* Checkout Steps */}
        <div className="checkout-form">
          {/* Step Indicators */}
          <div className="step-indicators">
            <div
              className={`step ${step === 1 ? "active" : step > 1 ? "completed" : ""}`}
            >
              <span className="step-number">1</span>
              <span className="step-label">Shipping</span>
            </div>
            <div
              className={`step ${step === 2 ? "active" : step > 2 ? "completed" : ""}`}
            >
              <span className="step-number">2</span>
              <span className="step-label">Payment</span>
            </div>
            <div className={`step ${step === 3 ? "active" : ""}`}>
              <span className="step-number">3</span>
              <span className="step-label">Review</span>
            </div>
          </div>

          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="form-section">
              <h2>Shipping Information</h2>
              <form>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group full">
                  <label>Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>ZIP Code *</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>
              </form>
              <button className="btn btn-primary" onClick={() => setStep(2)}>
                Continue to Payment
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="form-section">
              <h2>Payment Information</h2>
              <form>
                <div className="form-group full">
                  <label>Name on Card *</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group full">
                  <label>Card Number *</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date *</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      name="cardExp"
                      value={formData.cardExp}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVC *</label>
                    <input
                      type="text"
                      placeholder="123"
                      name="cardCVC"
                      value={formData.cardCVC}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </form>
              <div className="security-info">
                <span>🔒</span>
                <span>Your payment information is encrypted and secure</span>
              </div>
              <div className="button-group">
                <button
                  className="btn btn-secondary"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button className="btn btn-primary" onClick={() => setStep(3)}>
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="form-section">
              <h2>Review Your Order</h2>
              <div className="review-section">
                <h3>Shipping Address</h3>
                <p>
                  {formData.firstName} {formData.lastName}
                </p>
                <p>{formData.address}</p>
                <p>
                  {formData.city}, {formData.state} {formData.zip}
                </p>
                <p>
                  {formData.email} | {formData.phone}
                </p>
              </div>
              <div className="review-section">
                <h3>Payment Method</h3>
                <p>Card ending in {formData.cardNumber.slice(-4)}</p>
              </div>
              <div className="review-items">
                <h3>Order Items</h3>
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="review-item">
                    <span>
                      {item.name} (Size: {item.size}) x{item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="button-group">
                <button
                  className="btn btn-secondary"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
                <button className="btn btn-primary" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <aside className="order-summary-sidebar">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="summary-item">
                <div>
                  <p className="item-name">{item.name}</p>
                  <p className="item-details">
                    Size: {item.size} | Qty: {item.quantity}
                  </p>
                </div>
                <p className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
