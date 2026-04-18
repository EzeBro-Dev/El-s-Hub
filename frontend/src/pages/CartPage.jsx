import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/page-cart.css";

export default function CartPage({ cart, removeFromCart, updateCartQuantity }) {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax - discount;

  const applyPromo = () => {
    if (promoCode === "WELCOME10") {
      setDiscount(subtotal * 0.1);
      alert("Promo code applied! 10% off");
    } else {
      alert("Invalid promo code");
    }
  };

  if (cart.length === 0) {
    return (
      <main className="container py-4">
        <h1 className="mb-3">Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/shop" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <h1 className="mb-3">Shopping Cart</h1>

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={`${item.id}-${item.size}`}>
                  <td>
                    <div className="product-cell">
                      <img src={item.image} alt={item.name} />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>{item.size}</td>
                  <td>${item.price}</td>
                  <td>
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.id,
                            item.size,
                            item.quantity - 1,
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartQuantity(
                            item.id,
                            item.size,
                            parseInt(e.target.value || 1),
                          )
                        }
                      />
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.id,
                            item.size,
                            item.quantity + 1,
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id, item.size)}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <aside className="order-summary">
          <h2>Order Summary</h2>

          <div className="promo-section">
            <input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button
              onClick={applyPromo}
              className="btn btn-small btn-secondary"
            >
              Apply
            </button>
          </div>

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
          {discount > 0 && (
            <div className="summary-row discount">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="btn btn-primary btn-block">
            Proceed to Checkout
          </Link>
          <Link to="/shop" className="btn btn-secondary btn-block mt-2">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}
