# 🚀 El's Hub - Quick Start Guide

A modern, high-end eCommerce website with React + Vite frontend and Django backend.

## What's Included

✅ **Complete Full-Stack eCommerce Platform**

- React 18 + Vite frontend with luxury UI/UX
- Django 4.2 REST API backend
- 8 pre-loaded luxury fashion products
- Shopping cart, wishlist, checkout flow
- Dark mode support
- Fully responsive design
- Real-time filtering and sorting

## Prerequisites

- **Node.js 16+** and npm
- **Python 3.9+**
- Git (optional)

## Installation (Windows, Mac, Linux)

### Quick Setup - 3 Steps

#### 1️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit: **http://localhost:5173**

#### 2️⃣ Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Visit: **http://localhost:8000**
Admin: **http://localhost:8000/admin**

## Key Features

### 🎨 Design & UX

- Luxury brand aesthetic (Balenciaga/Zara inspired)
- Neutral color palette with gold accents
- Smooth animations and micro-interactions
- Responsive mobile-first design
- Dark/light mode toggle

### 🛍️ Shopping Features

- Browse products by category, gender, price, color
- Detailed product pages with image gallery
- Customer reviews and ratings
- Add to cart with size/color selection
- Wishlist functionality
- Shopping cart with promo codes
- Multi-step checkout process
- Order confirmation

### 💻 Technical Stack

- **Frontend**: React 18, Vite, React Router, Vanilla CSS
- **Backend**: Django 4.2, Django REST Framework, SQLite
- **Database**: SQLite (easily switch to PostgreSQL)
- **Styling**: CSS Variables, Responsive Grid/Flexbox

## File Structure

```
project/
├── frontend/                 # React + Vite
│   ├── src/
│   │   ├── components/      # Navigation, Hero, ProductCard, etc.
│   │   ├── pages/          # Home, Shop, Product, Cart, Checkout
│   │   ├── styles/         # CSS files (global, components, pages)
│   │   └── hooks/          # useProducts hook for data
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/                 # Django
    ├── fashion_store/      # Django settings
    ├── store/             # Products, Orders, Reviews
    ├── manage.py
    └── requirements.txt
```

## Usage

### Frontend - Development

```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview build locally
```

### Backend - Management

```bash
cd backend

# Activate venv first
python manage.py migrate          # Run migrations
python manage.py createsuperuser  # Create admin user
python manage.py runserver        # Start server
python manage.py shell           # Django shell
python manage.py test            # Run tests
```

## Sample Products

The app comes with 8 luxury fashion items:

- Minimal White Tee
- Black Tailored Pants
- Oversized Blazer
- Minimalist Sneakers
- Linen Shirt (Men)
- Wide-Leg Trousers
- Luxury Silk Scarf
- Leather Belt

Add more via:

1. Django admin panel: http://localhost:8000/admin
2. Admin products form
3. Edit `frontend/src/hooks/useProducts.js` for mock data

## API Endpoints

### Products

```
GET    /api/products/                    List products
GET    /api/products/{id}/               Get product details
GET    /api/products/{id}/reviews/       Get reviews
POST   /api/products/{id}/add_review/    Add review
```

### Orders

```
POST   /api/orders/                      Create order
GET    /api/orders/{id}/                 Get order details
PATCH  /api/orders/{id}/update_status/   Update status
```

### Filtering

Available query parameters:

- `search` - Search products
- `category` - Filter by category
- `gender` - Filter by gender
- `min_price` - Minimum price
- `max_price` - Maximum price
- `is_new` - New products
- `is_sale` - Sale items

**Example:**

```
GET /api/products/?gender=women&max_price=200&ordering=-created_at
```

## Customization

### Change Brand Colors

Edit `frontend/src/styles/index.css`:

```css
:root {
  --accent-color: #d4af37; /* Gold */
  --text-primary: #000000; /* Black */
  --bg-primary: #ffffff; /* White */
}
```

### Change Product Data

- **Frontend Mock**: `frontend/src/hooks/useProducts.js`
- **Admin Panel**: http://localhost:8000/admin
- **Add via API**: POST to `/api/products/`

### Add New Pages

1. Create in `frontend/src/pages/YourPage.jsx`
2. Add route: `<Route path="/yourpath" element={<YourPage />} />`
3. Add nav link in `Navigation.jsx`

## Promo Codes

Test with: **WELCOME10** (10% discount)

Edit in `frontend/src/pages/CartPage.jsx`:

```javascript
if (promoCode === "WELCOME10") {
  setDiscount(subtotal * 0.1);
}
```

## Troubleshooting

### Port Already in Use

```bash
# Frontend (change port)
npm run dev -- --port 3000

# Backend (change port)
python manage.py runserver 8001
```

### CORS Errors

Check backend `fashion_store/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Frontend URL
]
```

### Database Issues

```bash
python manage.py migrate --run-syncdb
rm db.sqlite3  # If corrupted
python manage.py migrate
```

### Missing Dependencies

```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && pip install -r requirements.txt
```

## Deployment

### Frontend (Netlify, Vercel, etc.)

```bash
npm run build
# Deploy 'dist' folder
```

### Backend (Heroku, Railway, etc.)

```bash
# Ensure Procfile exists
web: gunicorn fashion_store.wsgi
```

## Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Django Tutorial](https://docs.djangoproject.com)
- [Django REST Framework](https://www.django-rest-framework.org)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid)

## Next Steps

1. ✅ Run frontend and backend
2. ✅ Browse products on home page
3. ✅ Test shopping flow
4. ✅ Try filters and search
5. ✅ Add to cart and checkout
6. ✅ Access admin panel
7. ✅ Customize colors and content
8. ✅ Connect to real database
9. ✅ Add payment processing
10. ✅ Deploy to production

## Support

- Check README.md files in each folder
- Review code comments
- Run tests to validate functionality
- Check browser console for errors

## License

MIT - Use freely for learning and commercial projects

---

**Happy Coding! 🎉**

Built with ❤️ for fashion lovers

Questions? Start with the main README.md or folder-specific guides.
