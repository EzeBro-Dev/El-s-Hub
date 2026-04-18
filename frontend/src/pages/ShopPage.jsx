import { useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../hooks/useProducts";
import "../styles/page-shop.css";

export default function ShopPage({ addToCart, toggleWishlist, wishlist }) {
  const { products, getProducts, loading } = useProducts();
  const [filters, setFilters] = useState({
    gender: "all",
    minPrice: "",
    maxPrice: "",
    color: "",
    category: "",
    search: "",
  });
  const [sort, setSort] = useState("newest");

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      gender: "all",
      minPrice: "",
      maxPrice: "",
      color: "",
      category: "",
      search: "",
    });
  };

  const filteredProducts = getProducts({ ...filters, sort });
  const totalResults = filteredProducts.length;

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <main className="container py-4">
      <h1 className="mb-3">Shop</h1>

      <div className="layout-with-sidebar">
        {/* Sidebar Filter */}
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={handleClearFilters}
        />

        {/* Products Section */}
        <div>
          {/* Sort Bar */}
          <div className="sort-bar">
            <p className="result-count">Showing {totalResults} results</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="popularity">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          <ProductGrid
            products={filteredProducts}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlisted={wishlist}
          />
        </div>
      </div>
    </main>
  );
}
