import { useState, useEffect, useContext, createContext } from "react";

const API_URL = "https://el-s-hub.onrender.com";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(true);

  const jsonHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const parseErrorResponse = async (response) => {
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      return data.detail || data.error || JSON.stringify(data);
    } catch {
      return text || response.statusText || `HTTP error ${response.status}`;
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/profile/`, {
        headers: {
          ...jsonHeaders,
          Authorization: `Token ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    username,
    email,
    password,
    password2,
    first_name = "",
    last_name = "",
  ) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register/`, {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({
          username,
          email,
          password,
          password2,
          first_name,
          last_name,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("authToken", data.token);
        return { success: true };
      } else {
        const errorMessage = await parseErrorResponse(response);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login/`, {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("authToken", data.token);
        return { success: true };
      } else {
        const errorMessage = await parseErrorResponse(response);
        return { success: false, error: errorMessage || "Login failed" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await fetch(`${API_URL}/api/auth/logout/`, {
          method: "POST",
          headers: {
            ...jsonHeaders,
            Authorization: `Token ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/profile/update/`, {
        method: "PUT",
        headers: {
          ...jsonHeaders,
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        return { success: true, user: data };
      } else {
        const errorMessage = await parseErrorResponse(response);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const changePassword = async (oldPassword, newPassword, newPassword2) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/change-password/`, {
        method: "POST",
        headers: {
          ...jsonHeaders,
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
          new_password2: newPassword2,
        }),
      });

      if (response.ok) {
        return { success: true };
      } else {
        const errorMessage = await parseErrorResponse(response);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        register,
        login,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
