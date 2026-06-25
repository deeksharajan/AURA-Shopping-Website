# AURA – Modern Fashion E-Commerce Platform

AURA is a responsive fashion e-commerce web application built with React.js, designed to provide an intuitive and engaging online shopping experience through dynamic product discovery, cart management, checkout workflows, and personalized user interactions. The platform allows users to browse fashion products across multiple categories, discover exclusive deals, manage their shopping cart, complete purchases, view order history, and personalize their experience through theme customization.

Designed with a clean and responsive user interface, AURA demonstrates modern frontend development practices including component-based architecture, state management using React Hooks, dynamic rendering, modal-driven interactions, and user-focused shopping workflows.

---

## Highlights

- Multi-category fashion catalog
- Real-time product search
- Deals & clearance filtering
- Shopping cart management
- Checkout workflow
- Order history tracking
- Dark/Light theme support
- Responsive UI design



## Features

### Product Catalog
- Browse products across multiple categories:
  - Clothes
  - Shoes
  - Bags
  - Accessories
- Dynamic product rendering from centralized catalog data
- Responsive product grid layout

### Product Discovery
- Real-time search functionality
- Category-based filtering
- Today's Deals section
- Clearance Sale section
- Dynamic product count updates

### Product Details
- Interactive product detail modal
- Product descriptions and pricing information
- Size selection support
- Quick Add-to-Cart functionality

### Shopping Cart
- Add products to cart
- Quantity management
- Remove items from cart
- Dynamic subtotal calculation
- Slide-out cart drawer interface

### Checkout System
- Customer information collection
- Order summary generation
- Simulated checkout workflow
- Order confirmation process

### Order Management
- Order history tracking
- Purchase records management
- Order summary display

### User Experience
- Light and Dark Theme support
- Theme preference persistence using Local Storage
- Smooth scrolling navigation
- Responsive design for different screen sizes
- Modern fashion-focused UI

### User Profile
- Profile modal interface
- Personalized account section
- Integrated navigation experience

---

## Technologies Used

| Technology | Purpose |
|------------|----------|
| React.js | Frontend Framework |
| JavaScript (ES6+) | Application Logic |
| CSS3 | Styling & Responsive Design |
| React Hooks | State Management |
| Local Storage | Theme Persistence |

---

## Project Structure

```text
src/
│
├── components/
│   ├── Header.jsx
│   ├── PromoWidget.jsx
│   ├── ShowcasePanel.jsx
│   ├── CartDrawer.jsx
│   ├── ProductModal.jsx
│   ├── CheckoutModal.jsx
│   ├── Profile.jsx
│   └── OrderHistory.jsx
│
├── data/
│   └── catalog.js
│
├── utils/
│   └── productHelpers.js
│
├── App.jsx
├── App.css
└── main.jsx
```

---

## Key Functionalities

### Dynamic Product Management
Products are managed through a centralized catalog system, enabling efficient category organization and scalable product management.

### State Management
The application uses React Hooks to manage:
- Shopping Cart State
- Product Selection
- Search Filters
- Category Navigation
- Theme Preferences
- Checkout Flow
- Order History

### Theme System
Users can switch between Light and Dark modes. Theme preferences are automatically stored using Local Storage and restored on future visits.

### Shopping Workflow
AURA simulates a complete e-commerce purchasing process:

1. Browse Products
2. Search & Filter
3. View Product Details
4. Add to Cart
5. Manage Cart
6. Checkout
7. Place Order
8. View Order History

---

## Learning Outcomes

This project demonstrates practical experience in:

- React Component Architecture
- State Management with Hooks
- Conditional Rendering
- Dynamic Data Handling
- Modal Management
- E-Commerce Workflow Design
- Responsive UI Development
- Local Storage Integration
- Frontend Application Structuring

---

## Future Enhancements

- User Authentication & Authorization
- Backend Integration
- Payment Gateway Integration
- Wishlist Functionality
- Product Reviews & Ratings
- Inventory Management
- Database Connectivity
- Admin Dashboard
- Order Status Tracking
- Product Recommendation System
