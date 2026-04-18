import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/page-profile.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        bio: user.bio || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zip: user.zip || "",
        country: user.country || "",
      });
    }
  }, [user, isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const result = await updateProfile(formData);
    if (result.success) {
      setMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage(result.error || "Failed to update profile");
    }
    setLoading(false);
  };

  if (!isAuthenticated || !user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <main className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.first_name} />
            ) : (
              <div className="avatar-placeholder">
                {user.first_name?.charAt(0).toUpperCase()}
                {user.last_name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="profile-info">
            <h1>
              {user.first_name} {user.last_name}
            </h1>
            <p className="username">@{user.username}</p>
            <p className="email">{user.email}</p>
          </div>

          <button
            className="btn btn-secondary"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {message && (
          <div
            className={`message ${message.includes("successfully") ? "success" : "error"}`}
          >
            {message}
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSave} className="profile-form">
            <h2>Edit Your Information</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State/Province</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="zip">Zip/Postal Code</label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="Postal code"
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <h2>Account Information</h2>
            <div className="details-grid">
              {formData.bio && (
                <div className="detail-item">
                  <span className="label">Bio</span>
                  <span className="value">{formData.bio}</span>
                </div>
              )}
              {formData.phone && (
                <div className="detail-item">
                  <span className="label">Phone</span>
                  <span className="value">{formData.phone}</span>
                </div>
              )}
              {formData.address && (
                <div className="detail-item">
                  <span className="label">Address</span>
                  <span className="value">{formData.address}</span>
                </div>
              )}
              {formData.city && (
                <div className="detail-item">
                  <span className="label">City</span>
                  <span className="value">{formData.city}</span>
                </div>
              )}
              {formData.state && (
                <div className="detail-item">
                  <span className="label">State</span>
                  <span className="value">{formData.state}</span>
                </div>
              )}
              {formData.zip && (
                <div className="detail-item">
                  <span className="label">Postal Code</span>
                  <span className="value">{formData.zip}</span>
                </div>
              )}
              {formData.country && (
                <div className="detail-item">
                  <span className="label">Country</span>
                  <span className="value">{formData.country}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
