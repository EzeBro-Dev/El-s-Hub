import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/page-auth.css";

export default function AccountSettings() {
  const navigate = useNavigate();
  const { isAuthenticated, changePassword } = useAuth();
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    new_password2: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.old_password) {
      newErrors.old_password = "Current password is required";
    }

    if (!formData.new_password) {
      newErrors.new_password = "New password is required";
    } else if (formData.new_password.length < 6) {
      newErrors.new_password = "Password must be at least 6 characters";
    }

    if (formData.new_password !== formData.new_password2) {
      newErrors.new_password2 = "Passwords do not match";
    }

    if (formData.old_password === formData.new_password) {
      newErrors.new_password =
        "New password must be different from current password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage("");

    const result = await changePassword(
      formData.old_password,
      formData.new_password,
      formData.new_password2,
    );

    if (result.success) {
      setMessage("Password changed successfully!");
      setFormData({
        old_password: "",
        new_password: "",
        new_password2: "",
      });
      setTimeout(() => setMessage(""), 3000);
    } else {
      if (result.errors) {
        setErrors(result.errors);
      } else {
        setMessage(result.error || "Failed to change password");
      }
    }
    setLoading(false);
  };

  return (
    <main className="auth-container">
      <div className="auth-card">
        <h1>Security Settings</h1>
        <p className="auth-subtitle">
          Change your password to keep your account secure
        </p>

        {message && (
          <div
            className={`message ${message.includes("successfully") ? "success" : "error"}`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="old_password">Current Password</label>
            <input
              type="password"
              id="old_password"
              name="old_password"
              value={formData.old_password}
              onChange={handleChange}
              placeholder="Enter your current password"
            />
            {errors.old_password && (
              <span className="error-text">{errors.old_password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="new_password">New Password</label>
            <input
              type="password"
              id="new_password"
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              placeholder="At least 6 characters"
            />
            {errors.new_password && (
              <span className="error-text">{errors.new_password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="new_password2">Confirm New Password</label>
            <input
              type="password"
              id="new_password2"
              name="new_password2"
              value={formData.new_password2}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
            {errors.new_password2 && (
              <span className="error-text">{errors.new_password2}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            <a href="/profile" className="back-link">
              ← Back to Profile
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
