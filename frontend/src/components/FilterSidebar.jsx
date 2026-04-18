import "../styles/filters.css";

export default function FilterSidebar({ filters, onFilterChange, onClear }) {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["White", "Black", "Beige", "Navy", "Gray", "Cream"];
  const categories = ["Tops", "Bottoms", "Outerwear", "Shoes", "Accessories"];

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Filter</h3>
        <button className="clear-btn" onClick={onClear}>
          Clear All
        </button>
      </div>

      {/* Gender Filter */}
      <div className="filter-group">
        <h4>Gender</h4>
        <div className="filter-options">
          <label>
            <input
              type="radio"
              name="gender"
              value="all"
              checked={filters.gender === "all"}
              onChange={(e) => onFilterChange("gender", e.target.value)}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="men"
              checked={filters.gender === "men"}
              onChange={(e) => onFilterChange("gender", e.target.value)}
            />
            Men
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="women"
              checked={filters.gender === "women"}
              onChange={(e) => onFilterChange("gender", e.target.value)}
            />
            Women
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="unisex"
              checked={filters.gender === "unisex"}
              onChange={(e) => onFilterChange("gender", e.target.value)}
            />
            Unisex
          </label>
        </div>
      </div>

      {/* Price Filter */}
      <div className="filter-group">
        <h4>Price Range</h4>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onFilterChange("minPrice", e.target.value)}
            min="0"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange("maxPrice", e.target.value)}
            min="0"
          />
        </div>
        <div className="range-slider">
          <input
            type="range"
            min="0"
            max="500"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange("maxPrice", e.target.value)}
            className="slider"
          />
        </div>
      </div>

      {/* Color Filter */}
      <div className="filter-group">
        <h4>Color</h4>
        <div className="color-options">
          {colors.map((color) => (
            <label key={color}>
              <input
                type="checkbox"
                value={color}
                checked={filters.color === color}
                onChange={(e) =>
                  onFilterChange(
                    "color",
                    e.target.checked ? e.target.value : "",
                  )
                }
              />
              <span
                className="color-swatch"
                data-color={color.toLowerCase()}
              ></span>
              {color}
            </label>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="filter-group">
        <h4>Category</h4>
        <div className="filter-options">
          {categories.map((cat) => (
            <label key={cat}>
              <input
                type="checkbox"
                value={cat.toLowerCase()}
                checked={filters.category === cat.toLowerCase()}
                onChange={(e) =>
                  onFilterChange(
                    "category",
                    e.target.checked ? e.target.value : "",
                  )
                }
              />
              {cat}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
