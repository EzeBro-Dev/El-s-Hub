# Backend - El's Hub

Django REST API backend for the El's Hub eCommerce platform.

## Quick Start

### Installation

```bash
pip install -r requirements.txt
```

### Database Setup

```bash
python manage.py migrate
```

### Create Admin User

```bash
python manage.py createsuperuser
```

### Run Server

```bash
python manage.py runserver
```

Runs on `http://localhost:8000`

## Project Structure

- `fashion_store/` - Django project settings
  - `settings.py` - Configuration
  - `urls.py` - URL routing
  - `wsgi.py` - WSGI configuration

- `store/` - Main app
  - `models.py` - Database models
  - `serializers.py` - DRF serializers
  - `views.py` - API views/viewsets
  - `urls.py` - API routes
  - `admin.py` - Admin configuration

## Models

### Product

- name, description, price, original_price
- category (tops, bottoms, outerwear, shoes, accessories)
- gender (men, women, unisex)
- is_new, is_sale flags
- rating, reviews count
- stock quantity
- images

### ProductVariant

- Stores size/color combinations
- Track stock per variant

### Order

- Customer information (name, email, phone)
- Shipping address details
- Payment/pricing info
- Order status tracking

### OrderItem

- Links to orders and products
- Size, color, quantity, price

### Review

- Product rating (1-5)
- Author and content
- Verified purchase flag

### NewsletterSubscription

- Email subscriptions
- Active status tracking

## API Endpoints

### Products

```
GET    /api/products/                    - List products (with filters)
GET    /api/products/{id}/               - Get product details
GET    /api/products/{id}/reviews/       - Get product reviews
POST   /api/products/{id}/add_review/    - Add review to product
```

**Query Parameters:**

- `search` - Search by name/description
- `category` - Filter by category
- `gender` - Filter by gender
- `min_price` - Minimum price
- `max_price` - Maximum price
- `is_new` - Filter new items
- `is_sale` - Filter sale items
- `ordering` - Sort by field

### Orders

```
POST   /api/orders/                      - Create new order
GET    /api/orders/{id}/                 - Get order details
PATCH  /api/orders/{id}/update_status/   - Update order status
```

### Reviews

```
GET    /api/reviews/                     - List reviews
POST   /api/reviews/                     - Create review
```

**Query Parameters:**

- `product_id` - Filter by product

### Newsletter

```
POST   /api/newsletter/                  - Subscribe to newsletter
```

## Authentication

Currently supports:

- Session authentication
- Token authentication (for API requests)

To add token auth:

```bash
python manage.py drf_create_token <username>
```

Use header: `Authorization: Token <token>`

## Admin Interface

Access at `http://localhost:8000/admin/`

Features:

- Manage products
- View/update orders
- Moderate reviews
- Manage newsletter subscriptions
- User management

## Settings

Key settings in `settings.py`:

- `DEBUG = True` - Development mode
- `ALLOWED_HOSTS = ['*']` - All origins allowed
- `CORS_ALLOWED_ORIGINS` - CORS configuration
- `REST_FRAMEWORK` - DRF settings

## Database

Uses SQLite by default:

- Location: `db.sqlite3`
- Easy for development
- Switch to PostgreSQL for production

## Dependencies

```
Django==4.2.7
djangorestframework==3.14.0
django-cors-headers==4.3.1
Pillow==10.1.0
```

## Development Commands

```bash
# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Load sample data
python manage.py loaddata initial_products

# Run tests
python manage.py test

# Shell
python manage.py shell

# Create app
python manage.py startapp app_name
```

## Testing the API

### Using curl

```bash
# Get products
curl http://localhost:8000/api/products/

# Create order
curl -X POST http://localhost:8000/api/orders/ \
  -H "Content-Type: application/json" \
  -d '{...order data...}'
```

### Using Postman

1. Import API collection
2. Set base URL to `http://localhost:8000/api/`
3. Test endpoints

## Production Deployment

### Before Deploying

1. Set `DEBUG = False`
2. Change `SECRET_KEY` to secure random value
3. Update `ALLOWED_HOSTS`
4. Collect static files: `python manage.py collectstatic`
5. Switch to PostgreSQL database
6. Set up email backend
7. Configure CORS properly

### Deployment Options

- Heroku with `Procfile`
- AWS EC2
- DigitalOcean
- PythonAnywhere
- Railway

## Common Issues

**ModuleNotFoundError**

```bash
pip install -r requirements.txt
```

**Database locked**

```bash
rm db.sqlite3
python manage.py migrate
```

**Port already in use**

```bash
python manage.py runserver 8001
```

**CORS errors**

- Check `CORS_ALLOWED_ORIGINS` in settings
- Ensure frontend URL is whitelisted

## Performance Optimization

- Add database indexes (done in models)
- Use `select_related()` for foreign keys
- Use `prefetch_related()` for reverse relations
- Enable caching
- Implement pagination
- Use `.only()` to limit fields

## Security Considerations

- Use HTTPS in production
- Set secure cookies
- Validate all inputs
- Use CSRF protection
- Rate limiting for APIs
- Input sanitization
- SQL injection prevention (Django ORM handles this)

## Monitoring

To add monitoring:

```bash
pip install django-debug-toolbar
```

## Next Steps

- Connect to payment gateway
- Add email notifications
- Implement caching
- Add API documentation (Django REST Swagger)
- Set up logging
- Add unit/integration tests
- Configure production database

---

For issues or questions, check the main README.md
