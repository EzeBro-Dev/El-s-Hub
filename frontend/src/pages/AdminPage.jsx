import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useProducts } from "../hooks/useProducts";
import "../styles/page-admin.css";

const AdminPage = () => {
  const { user } = useAuth();
  const {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refetchProducts,
  } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    category: "tops",
    gender: "unisex",
    is_new: false,
    is_sale: false,
    stock: 100,
  });
  const [imageFile, setImageFile] = useState(null);
  const [image2File, setImage2File] = useState(null);

  const categories = [
    { value: "tops", label: "Tops" },
    { value: "bottoms", label: "Bottoms" },
    { value: "outerwear", label: "Outerwear" },
    { value: "shoes", label: "Shoes" },
    { value: "accessories", label: "Accessories" },
  ];

  const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    const headers = { Accept: "application/json" };
    return token ? { ...headers, Authorization: `Token ${token}` } : headers;
  };

  const genders = [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "unisex", label: "Unisex" },
  ];

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        price: editingProduct.price || "",
        original_price: editingProduct.original_price || "",
        category: editingProduct.category || "tops",
        gender: editingProduct.gender || "unisex",
        is_new: editingProduct.is_new || false,
        is_sale: editingProduct.is_sale || false,
        stock: editingProduct.stock || 100,
      });
      setImageFile(null);
      setImage2File(null);
    }
  }, [editingProduct]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        submitData.append(key, value);
      }
    });

    if (imageFile) {
      submitData.append("image", imageFile);
    }
    if (image2File) {
      submitData.append("image2", image2File);
    }

    let result;
    if (editingProduct) {
      result = await updateProduct(editingProduct.id, submitData);
    } else {
      result = await createProduct(submitData);
    }

    if (result.success) {
      setShowForm(false);
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        original_price: "",
        category: "tops",
        gender: "unisex",
        is_new: false,
        is_sale: false,
        stock: 100,
      });
      setImageFile(null);
      setImage2File(null);
      refetchProducts();
      alert("Product saved successfully!");
    } else {
      console.error("Error saving product:", result.error);
      alert(`Error saving product: ${result.error}`);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const result = await deleteProduct(productId);
      if (result.success) {
        refetchProducts();
      } else {
        alert(`Error: ${result.error}`);
      }
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      original_price: "",
      category: "tops",
      gender: "unisex",
      is_new: false,
      is_sale: false,
      stock: 100,
    });
    setImageFile(null);
    setImage2File(null);
  };

  if (!user) {
    return (
      <div className="admin-page">
        <div className="container">
          <h1>Access Denied</h1>
          <p>You must be logged in to access the admin panel.</p>
          <p>
            Please <a href="/login">login</a> first.
          </p>
        </div>
      </div>
    );
  }

  const testAPI = async () => {
    try {
      const response = await fetch("/api/products/", {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        alert("API connection successful!");
      } else {
        alert(`API error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      alert(`API connection failed: ${error.message}`);
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Product Management</h1>
          <div className="debug-info">
            <small>
              Logged in as: {user.username} | Token:{" "}
              {localStorage.getItem("authToken") ? "Present" : "Missing"}
            </small>
            <button
              onClick={testAPI}
              style={{ marginLeft: "10px", fontSize: "0.8rem" }}
            >
              Test API
            </button>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add New Product"}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {showForm && (
          <div className="product-form">
            <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="original_price">Original Price</label>
                  <input
                    type="number"
                    id="original_price"
                    name="original_price"
                    step="0.01"
                    value={formData.original_price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender *</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    {genders.map((gen) => (
                      <option key={gen.value} value={gen.value}>
                        {gen.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="stock">Stock *</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      name="is_new"
                      checked={formData.is_new}
                      onChange={handleInputChange}
                    />
                    New Product
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      name="is_sale"
                      checked={formData.is_sale}
                      onChange={handleInputChange}
                    />
                    On Sale
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="image">Main Image</label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setImageFile)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image2">Secondary Image</label>
                  <input
                    type="file"
                    id="image2"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setImage2File)}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingProduct ? "Update Product" : "Create Product"}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="products-list">
          <h2>Products ({products.length})</h2>
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card-admin">
                  <div className="product-image">
                    <img
                      src={
                        product.image
                          ? `http://localhost:8000${product.image}`
                          : "/placeholder.jpg"
                      }
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = "/placeholder.jpg";
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">${product.price}</p>
                    <p className="category">
                      {product.category} - {product.gender}
                    </p>
                    <p className="stock">Stock: {product.stock}</p>
                    <div className="product-actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
