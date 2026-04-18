# Frontend - El's Hub

React + Vite frontend for the El's Hub eCommerce platform.

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Runs on `http://localhost:5173`

### Build

```bash
npm run build
```

## Project Structure

- `src/components/` - Reusable React components
  - `Navigation.jsx` - Sticky navbar with search and icons
  - `PromoBar.jsx` - Promotional banner
  - `Hero.jsx` - Full-screen hero section
  - `FeaturedCollections.jsx` - Collection grid
  - `ProductCard.jsx` - Individual product card
  - `ProductGrid.jsx` - Grid layout for products
  - `FilterSidebar.jsx` - Advanced filtering panel
  - `ReviewsSection.jsx` - Customer reviews
  - `RelatedProducts.jsx` - Recommended items
  - `Footer.jsx` - Footer with links and newsletter

- `src/pages/` - Page components
  - `HomePage.jsx` - Landing page with hero and collections
  - `ShopPage.jsx` - Product catalog with filters
  - `ProductDetailPage.jsx` - Single product view with reviews
  - `CartPage.jsx` - Shopping cart with order summary
  - `CheckoutPage.jsx` - Multi-step checkout flow

- `src/hooks/` - Custom React hooks
  - `useProducts.js` - Product data management and filtering

- `src/styles/` - CSS files
  - `index.css` - Global styles and CSS variables
  - `app.css` - App-level styles
  - `navigation.css` - Header/nav styles
  - `hero.css` - Hero section styles
  - `collections.css` - Collections grid styles
  - `product-card.css` - Product card styles
  - `product-grid.css` - Grid layout styles
  - `filters.css` - Filter sidebar styles
  - `footer.css` - Footer styles
  - `reviews.css` - Reviews section styles
  - `related-products.css` - Related products styles
  - `page-home.css` - Home page specific styles
  - `page-shop.css` - Shop page specific styles
  - `page-product.css` - Product detail page styles
  - `page-cart.css` - Cart page styles
  - `page-checkout.css` - Checkout page styles

- `src/App.jsx` - Main app component with routing
- `src/main.jsx` - React entry point
- `index.html` - HTML template

## Features

### UI Components

✨ Modern, luxury-inspired design with:

- Smooth hover animations
- Responsive grid layouts
- Dark mode support
- Accessible form controls
- Loading states and empty states

### Functionality

- Product filtering and sorting
- Shopping cart management
- Wishlist functionality
- Multi-step checkout
- Order confirmation
- Promo code validation
- LocalStorage persistence

### Styling

- CSS-in-JS using CSS variables
- Responsive design (mobile-first)
- Dark mode theme support
- Consistent spacing and typography
- Accessibility considerations

## Key Technologies

- **React 18** - UI library with hooks
- **Vite 5** - Lightning-fast build tool
- **React Router v6** - Client-side routing
- **Vanilla CSS** - Custom styling (no CSS frameworks)

## Configuration

### Environment Variables

Create `.env` file:

```
VITE_API_URL=http://localhost:8000/api
```

### Vite Config

Configured for:

- React Fast Refresh
- CSS modules support
- Dev server with API proxy
- Production-optimized builds

## Development Tips

### Adding a New Component

1. Create file in `src/components/`
2. Use functional component with hooks
3. Import and use in pages/components
4. Add CSS file in `src/styles/`

### Adding a New Page

1. Create in `src/pages/`
2. Add route in `App.jsx`
3. Add navigation link in `Navigation.jsx`
4. Create dedicated CSS file

### Styling Guidelines

- Use CSS variables from `:root`
- Follow BEM naming convention
- Mobile-first responsive design
- Test dark mode compatibility

### Performance Best Practices

- Lazy load images
- Minimize bundle size
- Use React.memo for expensive renders
- Optimize images before use

## Common Issues

**Styles not applying?**

- Check CSS file is imported correctly
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server

**API calls failing?**

- Ensure backend is running
- Check CORS settings in Django
- Verify API URL in environment variables

**Build errors?**

- Clear `node_modules` and reinstall
- Check for syntax errors
- Look at error messages in terminal

## Next Steps

- Add real product images
- Connect to backend API
- Implement user authentication
- Add payment processing
- Set up analytics
- Deploy to production

---

For issues or questions, check the main README.md
