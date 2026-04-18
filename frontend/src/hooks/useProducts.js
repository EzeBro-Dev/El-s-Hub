import { useState, useEffect } from "react";

const API_BASE = "/api";

const defaultJsonHeaders = {
  Accept: "application/json",
};

const parseErrorResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (contentType.includes("application/json") && text) {
    try {
      const data = JSON.parse(text);
      return data.detail || data.error || JSON.stringify(data);
    } catch {
      return text;
    }
  }

  return text || response.statusText || `HTTP error ${response.status}`;
};

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return token
      ? { ...defaultJsonHeaders, Authorization: `Token ${token}` }
      : defaultJsonHeaders;
  };

  const fetchProducts = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          params.append(key, value);
        }
      });

      const url = `${API_BASE}/products/${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await fetch(url, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorMessage = await parseErrorResponse(response);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      // If paginated, data.results contains the products
      const productsData = data.results || data;
      setProducts(productsData);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductById = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/products/${id}/`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const errorMessage = await parseErrorResponse(response);
        throw new Error(errorMessage);
      }
      const product = await response.json();
      return product;
    } catch (err) {
      console.error("Error fetching product:", err);
      return null;
    }
  };

  const createProduct = async (productData) => {
    try {
      const formData = new FormData();

      if (!(productData instanceof FormData)) {
        Object.entries(productData).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            formData.append(key, value);
          }
        });
      }

      const body = productData instanceof FormData ? productData : formData;

      const response = await fetch(`${API_BASE}/products/`, {
        method: "POST",
        headers: getAuthHeaders(), // Don't set Content-Type for FormData
        body,
      });

      if (!response.ok) {
        const errorMessage = await parseErrorResponse(response);
        throw new Error(errorMessage);
      }

      const newProduct = await response.json();
      setProducts((prev) => [newProduct, ...prev]);
      return { success: true, product: newProduct };
    } catch (err) {
      console.error("Error creating product:", err);
      return { success: false, error: err.message };
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const formData = new FormData();

      if (!(productData instanceof FormData)) {
        Object.entries(productData).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            formData.append(key, value);
          }
        });
      }

      const body = productData instanceof FormData ? productData : formData;

      const response = await fetch(`${API_BASE}/products/${id}/`, {
        method: "PUT",
        headers: getAuthHeaders(), // Don't set Content-Type for FormData
        body,
      });

      if (!response.ok) {
        const errorMessage = await parseErrorResponse(response);
        throw new Error(errorMessage);
      }

      const updatedProduct = await response.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updatedProduct : p)),
      );
      return { success: true, product: updatedProduct };
    } catch (err) {
      console.error("Error updating product:", err);
      return { success: false, error: err.message };
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/products/${id}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorMessage = await parseErrorResponse(response);
        throw new Error(errorMessage);
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
      return { success: true };
    } catch (err) {
      console.error("Error deleting product:", err);
      return { success: false, error: err.message };
    }
  };

  const getProducts = (filters = {}) => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters.gender && filters.gender !== "all") {
      filtered = filtered.filter(
        (p) => p.gender === filters.gender || p.gender === "unisex",
      );
    }
    if (filters.minPrice) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice);
    }
    if (filters.color) {
      // Note: API might not have colors in the main product, but in variants
      // This is a simplified filter
    }
    if (filters.search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.description.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    // Sorting
    if (filters.sort === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "newest") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (filters.sort === "popularity") {
      filtered.sort((a, b) => b.reviews - a.reviews);
    }

    return filtered;
  };

  return {
    products,
    loading,
    error,
    getProductById,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    refetchProducts: fetchProducts,
  };
};
