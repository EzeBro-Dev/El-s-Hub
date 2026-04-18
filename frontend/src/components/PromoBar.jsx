import { useState } from "react";
import "../styles/navigation.css";

export default function PromoBar() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="promo-bar">
      <p>🎁 Free shipping on orders over $100 | Use code: WELCOME10</p>
      <button className="close-btn" onClick={() => setClosed(true)}>
        ✕
      </button>
    </div>
  );
}
