# 🛒 AradaBuy E-commerce Platform

A full-stack e-commerce application built with Node.js, Express, MySQL backend and React frontend with Tailwind CSS.

## 📋 Project Overview

AradaBuy is a modern e-commerce platform that allows users to browse products, manage shopping carts, place orders, and handle user authentication. The project is designed as a monorepo with separate backend and frontend directories.

## 🏗️ Architecture

### Project Structure
```
AradaBuy/
├── backend/                    # Node.js + Express + MySQL API
│   ├── config/                # Database configuration
│   │   └── db.js              # MySQL connection pool & table creation
│   ├── controllers/           # Business logic layer
│   │   ├── authController.js  # User authentication & profile management
│   │   ├── productController.js # Product CRUD operations
│   │   ├── orderController.js # Order management & processing
│   │   └── contactController.js # Contact form handling
│   ├── middleware/            # Request processing & security
│   │   ├── authMiddleware.js  # JWT verification & role-based access
│   │   └── errorMiddleware.js # Global error handling & 404 routes
│   ├── models/                # Database models & queries
│   │   ├── User.js            # User data operations & password hashing
│   │   ├── Product.js         # Product catalog management
│   │   └── Order.js           # Order & order items handling
│   ├── routes/                # API endpoint definitions
│   │   ├── authRoutes.js      # Authentication endpoints
│   │   ├── productRoutes.js   # Product management endpoints
│   │   ├── orderRoutes.js     # Order processing endpoints
│   │   └── contactRoutes.js   # Contact form endpoints
│   ├── validators/            # Request validation schemas
│   │   └── authValidators.js  # Joi schemas for auth requests
│   ├── server.js              # Main Express server & middleware setup
│   ├── package.json           # Backend dependencies & scripts
│   ├── env.example            # Environment variables template
│   └── .env                   # Environment configuration (create this)
├── frontend/                   # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Header.jsx     # Navigation bar & user menu
│   │   │   ├── Footer.jsx     # Site footer & links
│   │   │   ├── Navbar.jsx     # Navigation component
│   │   │   ├── ProtectedRoute.jsx # Route protection wrapper
│   │   │   └── ErrorBoundary.jsx  # Global error handling
│   │   ├── context/           # React Context for state management
│   │   │   ├── AuthContext.jsx    # User authentication state
│   │   │   └── CartContext.jsx    # Shopping cart state
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx       # Landing page with hero & categories
│   │   │   ├── Products.jsx   # Product catalog with filters
│   │   │   ├── ProductDetail.jsx # Individual product view
│   │   │   ├── Cart.jsx       # Shopping cart management
│   │   │   ├── Checkout.jsx   # Multi-step checkout process
│   │   │   ├── Login.jsx      # User login form
│   │   │   ├── Signup.jsx     # User registration form
│   │   │   ├── Profile.jsx    # User profile management
│   │   │   ├── Orders.jsx     # Order history & tracking
│   │   │   └── Contact.jsx    # Contact form & information
│   │   ├── services/          # API service layer
│   │   │   ├── authService.js # Authentication API calls
│   │   │   └── productService.js # Product API calls
│   │   ├── data/              # Mock data for development
│   │   │   └── products.json  # Sample product data
│   │   ├── App.jsx            # Main application component & routing
│   │   ├── main.jsx           # React application entry point
│   │   └── index.css          # Global styles & Tailwind imports
│   ├── public/                # Static assets
│   ├── index.html             # HTML template
│   ├── package.json           # Frontend dependencies & scripts
│   ├── vite.config.js         # Vite build configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   └── postcss.config.js      # PostCSS configuration
├── setup.sh                    # Linux/Mac setup script
├── setup.bat                   # Windows setup script
└── README.md                   # Project documentation
```

### System Architecture Overview

#### Backend Architecture (MVC Pattern)
- **Models**: Handle database operations and business logic
- **Controllers**: Process HTTP requests and manage application flow
- **Routes**: Define API endpoints and HTTP methods
- **Middleware**: Handle authentication, validation, and error processing
- **Database**: MySQL with connection pooling and automatic table creation

#### Frontend Architecture (Component-Based)
- **Components**: Reusable UI elements with props and state
- **Pages**: Route-specific components for different views
- **Context**: Global state management for authentication and cart
- **Services**: API communication layer with Axios
- **Styling**: Tailwind CSS with custom components and utilities

### Data Flow
1. **User Interaction** → React Component
2. **Component State** → Context Provider
3. **API Call** → Service Layer
4. **HTTP Request** → Express Route
5. **Route Handler** → Controller
6. **Business Logic** → Model
7. **Database Query** → MySQL
8. **Response** → Back through the chain

## 🚀 Features

### Backend Features

#### 🔐 Authentication & Authorization
- **JWT Token System**: Secure authentication with configurable expiration
- **Password Security**: bcrypt hashing with 12 salt rounds
- **Role-Based Access**: User and admin role management
- **Session Management**: Automatic token refresh and validation
- **Route Protection**: Middleware-based access control

#### 📦 Product Management
- **Full CRUD Operations**: Create, read, update, delete products
- **Category Management**: Product categorization and filtering
- **Stock Management**: Inventory tracking and updates
- **Image Support**: Product image URL management
- **Search & Filtering**: Advanced product discovery
- **Featured Products**: Highlighted product selection

#### 🛒 Order Processing
- **Order Creation**: Complete order workflow with validation
- **Status Tracking**: Order lifecycle management (pending → delivered)
- **Payment Status**: Track payment processing
- **Order Items**: Detailed product breakdown
- **Stock Updates**: Automatic inventory adjustment
- **Order History**: User order tracking and management

#### 📞 Contact System
- **Form Submission**: User inquiry handling
- **Message Management**: Admin message review system
- **Read/Unread Status**: Message tracking
- **Statistics**: Contact form analytics

#### 🗄️ Database Features
- **Automatic Setup**: Database and table creation on startup
- **Connection Pooling**: Efficient database connection management
- **Transaction Support**: ACID compliance for critical operations
- **Foreign Key Constraints**: Data integrity enforcement
- **Indexing**: Optimized query performance

#### 🛡️ Security Features
- **CORS Protection**: Cross-origin request handling
- **Rate Limiting**: API abuse prevention
- **Input Validation**: Joi schema validation
- **SQL Injection Prevention**: Parameterized queries
- **Security Headers**: Helmet middleware integration
- **Error Sanitization**: Safe error message handling

### Frontend Features

#### 🎨 User Interface
- **Responsive Design**: Mobile-first, tablet, and desktop optimization
- **Modern Aesthetics**: Glassmorphism, gradients, and shadows
- **Smooth Animations**: CSS transitions and keyframe animations
- **Interactive Elements**: Hover effects and micro-interactions
- **Loading States**: Skeleton loaders and progress indicators
- **Error Boundaries**: Graceful error handling and recovery

#### 🔐 Authentication Interface
- **Login Form**: Email/password authentication
- **Registration Form**: User account creation
- **Profile Management**: User information editing
- **Password Changes**: Secure password updates
- **Session Persistence**: Automatic login state management
- **Protected Routes**: Authentication-based navigation

#### 🛍️ Shopping Experience
- **Product Catalog**: Grid and list view options
- **Advanced Filtering**: Category, price, and search filters
- **Product Details**: Comprehensive product information
- **Shopping Cart**: Persistent cart with localStorage
- **Quantity Management**: Add, remove, and update quantities
- **Checkout Process**: Multi-step order completion

#### 📱 User Experience
- **Navigation**: Intuitive menu and breadcrumb navigation
- **Search Functionality**: Product search with suggestions
- **Responsive Layout**: Adaptive design for all screen sizes
- **Loading States**: Visual feedback during operations
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Toast notifications for actions

#### 🎯 Performance Features
- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Component lazy loading
- **Optimized Images**: Responsive image handling
- **Caching**: API response caching strategies
- **Bundle Optimization**: Vite build optimization

## 🛠️ Tech Stack

### Backend Technologies

#### Core Framework
- **Node.js**: JavaScript runtime environment (v18+)
- **Express.js**: Web application framework (v4.18+)
- **MySQL**: Relational database management system (v8.0+)

#### Database & ORM
- **mysql2/promise**: MySQL client with Promise support
- **Connection Pooling**: Efficient database connection management
- **Raw SQL**: Direct SQL queries with parameterized statements
- **Transactions**: ACID compliance for critical operations

#### Authentication & Security
- **JWT (jsonwebtoken)**: Stateless authentication tokens
- **bcryptjs**: Password hashing with configurable salt rounds
- **Helmet**: Security middleware for HTTP headers
- **CORS**: Cross-origin resource sharing configuration
- **Express Rate Limit**: API rate limiting and abuse prevention

#### Validation & Error Handling
- **Joi**: Schema validation for request data
- **Custom Error Middleware**: Centralized error handling
- **HTTP Status Codes**: Proper REST API response codes
- **Error Logging**: Comprehensive error tracking and debugging

#### Development Tools
- **Nodemon**: Automatic server restart on file changes
- **Morgan**: HTTP request logging middleware
- **dotenv**: Environment variable management
- **ESLint**: Code quality and style enforcement

### Frontend Technologies

#### Core Framework
- **React**: JavaScript library for building user interfaces (v18+)
- **Vite**: Fast build tool and development server
- **React Router DOM**: Client-side routing and navigation

#### State Management
- **React Context API**: Global state management
- **useState/useEffect**: Local component state and side effects
- **Custom Hooks**: Reusable logic encapsulation
- **localStorage**: Persistent data storage

#### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS**: Custom animations and component styles
- **Responsive Design**: Mobile-first responsive layouts
- **CSS Grid & Flexbox**: Modern layout techniques

#### HTTP & API
- **Axios**: HTTP client with interceptors
- **Request/Response Interceptors**: Automatic token management
- **Error Handling**: Centralized API error management
- **Mock Data**: Development data for UI testing

#### Development Tools
- **Vite Dev Server**: Hot module replacement
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: CSS vendor prefixing
- **ESLint**: Code quality enforcement

### Development Environment
- **Package Manager**: npm (v8+)
- **Version Control**: Git
- **Code Editor**: VS Code (recommended)
- **Browser DevTools**: Chrome/Firefox developer tools
- **API Testing**: Postman or similar REST client

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Icons**: React Icons
- **Utilities**: clsx

## 📦 Prerequisites

Before running this project, ensure you have:

- **Node.js** 18+ installed
- **MySQL** 8.0+ server running
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd AradaBuy
```

### 2. Environment Setup
Copy the environment template and configure your settings:
```bash
cd backend
cp env.example .env
# Edit .env with your database credentials and JWT secret
```

**⚠️ Security Note**: Never commit the `.env` file to version control. Contact the development team for security guidelines.

### 3. Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 4. Start the Application
```bash
# Terminal 1: Start backend (from backend/ directory)
cd backend
npm run dev

# Terminal 2: Start frontend (from frontend/ directory)
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📚 API Documentation

### API Overview
The AradaBuy API follows RESTful principles with consistent response formats, proper HTTP status codes, and comprehensive error handling. All endpoints return JSON responses and include appropriate CORS headers.

### Available Endpoints
- **Authentication**: User registration, login, profile management
- **Products**: Product catalog, search, filtering, and management
- **Orders**: Order creation, tracking, and history
- **Contact**: Contact form submission and management

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: API abuse prevention
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Cross-origin request handling

**Note**: Detailed API documentation is available in the development environment. Contact the development team for access to complete API specifications.

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Registration**: User provides name, email, password, phone (optional)
2. **Login**: User provides email and password
3. **Token**: JWT token is returned and stored in localStorage
4. **Protected Routes**: Token is automatically attached to API requests
5. **Expiration**: Tokens expire after 7 days (configurable)

## 🗄️ Database Schema

### Database Design Overview
The application uses a relational database design with proper normalization, foreign key constraints, and automatic timestamp management. All tables include audit fields for tracking creation and modification times.

### Core Tables
- **Users**: User account information and authentication data
- **Products**: Product catalog and inventory management
- **Orders**: Customer orders and their lifecycle tracking
- **Order Items**: Individual items within each order
- **Contact Messages**: Customer inquiries and support requests

### Database Features
- **Relational Design**: Proper normalization with foreign key constraints
- **Data Integrity**: Unique constraints and referential integrity
- **Audit Trail**: Automatic timestamp management for all records
- **Soft Deletes**: Safe deletion with status flags where appropriate
- **Indexing**: Optimized queries with strategic indexing

**Note**: Detailed database schema is available in the development environment. Contact the development team for database setup guidelines.

## 🎨 Frontend Structure

### Component Architecture
The frontend follows a component-based architecture with clear separation of concerns, reusable components, and centralized state management using React Context API.

### Core Components

#### Header Component (`components/Header.jsx`)
**Purpose**: Main navigation and user interface header
**Features**:
- Responsive navigation menu
- User authentication status display
- Shopping cart indicator
- Mobile-friendly hamburger menu
- Dynamic user menu (login/logout/profile)
- Search functionality integration

#### Footer Component (`components/Footer.jsx`)
**Purpose**: Site-wide footer with information and links
**Features**:
- Company information and social links
- Quick navigation links
- Contact information
- Copyright and legal notices
- Responsive grid layout

#### ProtectedRoute Component (`components/ProtectedRoute.jsx`)
**Purpose**: Route protection for authenticated users
**Features**:
- Authentication state checking
- Loading state management
- Automatic redirect to login
- Role-based access control support

#### ErrorBoundary Component (`components/ErrorBoundary.jsx`)
**Purpose**: Global error handling and recovery
**Features**:
- Catches JavaScript errors in component tree
- Displays user-friendly error messages
- Prevents complete app crashes
- Error logging and reporting

### Page Components

#### Home Page (`pages/Home.jsx`)
**Purpose**: Landing page and user entry point
**Features**:
- Hero section with call-to-action
- Featured products showcase
- Category navigation
- Why choose us section
- Responsive design for all devices

#### Products Page (`pages/Products.jsx`)
**Purpose**: Product catalog and browsing
**Features**:
- Product grid/list view
- Advanced filtering (category, price, search)
- Sorting options (price, name, newest)
- Pagination support
- Add to cart functionality
- URL state synchronization

#### Product Detail Page (`pages/ProductDetail.jsx`)
**Purpose**: Individual product information
**Features**:
- Product image gallery
- Detailed description and specifications
- Price and stock information
- Quantity selector
- Add to cart and buy now buttons
- Related products section

#### Cart Page (`pages/Cart.jsx`)
**Purpose**: Shopping cart management
**Features**:
- Cart item display and management
- Quantity adjustment controls
- Remove item functionality
- Order summary with totals
- Shipping and tax calculations
- Checkout process initiation

#### Checkout Page (`pages/Checkout.jsx`)
**Purpose**: Order completion process
**Features**:
- Multi-step checkout flow
- Shipping information collection
- Payment method selection
- Order review and confirmation
- Form validation and error handling

#### Authentication Pages
**Login Page** (`pages/Login.jsx`):
- Email/password authentication
- Form validation and error display
- Remember me functionality
- Password reset links

**Signup Page** (`pages/Signup.jsx`):
- User registration form
- Password strength requirements
- Terms and conditions acceptance
- Email verification support

#### User Management Pages
**Profile Page** (`pages/Profile.jsx`):
- User information editing
- Password change functionality
- Account settings management
- Profile picture upload

**Orders Page** (`pages/Orders.jsx`):
- Order history display
- Order status tracking
- Order details modal
- Invoice download support

#### Contact Page (`pages/Contact.jsx`)
**Purpose**: Customer support and inquiries
**Features**:
- Contact form with validation
- FAQ section
- Contact information display
- Office hours and location

### Context Providers

#### AuthContext (`context/AuthContext.jsx`)
**Purpose**: Global authentication state management
**State**:
- `user`: Current user information
- `loading`: Authentication state loading
- `error`: Authentication errors
- `backendAvailable`: Backend connectivity status

**Functions**:
- `login(email, password)`: User authentication
- `register(userData)`: User registration
- `logout()`: User logout and cleanup
- `updateProfile(profileData)`: Profile updates
- `changePassword(passwordData)`: Password changes

#### CartContext (`context/CartContext.jsx`)
**Purpose**: Shopping cart state management
**State**:
- `cart`: Array of cart items
- `loading`: Cart operation loading state

**Functions**:
- `addToCart(product, quantity)`: Add items to cart
- `removeFromCart(productId)`: Remove items from cart
- `updateQuantity(productId, quantity)`: Update item quantities
- `clearCart()`: Empty entire cart
- `getCartTotal()`: Calculate cart total
- `getCartItemCount()`: Get total item count

### Service Layer

#### AuthService (`services/authService.js`)
**Purpose**: Authentication API communication
**Features**:
- Axios instance with base configuration
- Request interceptors for JWT tokens
- Response interceptors for error handling
- Automatic token refresh logic

#### ProductService (`services/productService.js`)
**Purpose**: Product API communication
**Features**:
- Product listing and filtering
- Product detail retrieval
- Featured products fetching
- Category management

### Data Management

#### Mock Data (`data/products.json`)
**Purpose**: Development and testing data
**Features**:
- Sample product catalog
- Realistic product information
- Multiple categories and price ranges
- Image URL examples

### Styling System

#### Tailwind CSS Configuration
**Custom Theme**:
- Primary color palette (blue variants)
- Secondary color palette (gray variants)
- Accent colors (green, red, yellow)
- Custom font family (Inter)

**Custom Components**:
- Button variants (primary, secondary, outline)
- Card components with shadows
- Form input styling
- Modal and overlay components

**Custom Utilities**:
- Animation classes (fade-in, slide-in, scale)
- Glassmorphism effects
- Gradient text and backgrounds
- Custom shadows and borders

## 🔧 Development

### Development Workflow

#### 1. Project Setup
```bash
# Clone repository
git clone <repository-url>
cd AradaBuy

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Environment setup
cd ../backend
cp env.example .env
# Edit .env with your database credentials
```

#### 2. Development Process
```bash
# Terminal 1: Backend development
cd backend
npm run dev

# Terminal 2: Frontend development
cd frontend
npm run dev

# Terminal 3: Database (if using local MySQL)
mysql -u root -p
```

#### 3. Code Organization
- **Feature-based structure**: Group related files by feature
- **Separation of concerns**: Clear boundaries between layers
- **Consistent naming**: Follow established naming conventions
- **Documentation**: Comment complex logic and business rules

### Available Scripts

#### Backend Scripts
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm test             # Run tests (not implemented yet)
npm run lint         # Run ESLint for code quality
npm run build        # Build for production (if configured)
```

#### Frontend Scripts
```bash
npm run dev          # Start development server (Vite)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint for code quality
npm run type-check   # Type checking (if TypeScript added)
```

### Code Style & Standards

#### Backend Code Style
- **JavaScript**: ES6+ with async/await patterns
- **Error Handling**: Try-catch blocks with proper error responses
- **Database**: Raw SQL with parameterized statements for security
- **Validation**: Joi schemas for all input validation
- **Middleware**: Chainable middleware functions
- **Logging**: Structured logging with appropriate levels

#### Frontend Code Style
- **React**: Functional components with hooks
- **State Management**: Context API for global state, local state for components
- **Styling**: Tailwind CSS utility classes with custom components
- **Props**: Destructured props with default values
- **Event Handling**: Consistent event handler naming
- **Error Boundaries**: Graceful error handling and recovery

#### Database Code Style
- **Queries**: Parameterized statements to prevent SQL injection
- **Transactions**: Use transactions for multi-table operations
- **Connection Management**: Proper connection pooling and cleanup
- **Error Handling**: Database-specific error handling and logging

### Development Tools & Configuration

#### Backend Development
- **Nodemon**: Automatic server restart on file changes
- **Morgan**: HTTP request logging for debugging
- **dotenv**: Environment variable management
- **ESLint**: Code quality and style enforcement
- **MySQL Workbench**: Database management and query testing

#### Frontend Development
- **Vite**: Fast development server with HMR
- **React DevTools**: Component inspection and debugging
- **Tailwind CSS IntelliSense**: CSS class autocompletion
- **ESLint**: Code quality enforcement
- **Browser DevTools**: Network, console, and performance monitoring

#### Database Development
- **MySQL 8.0+**: Relational database management
- **Connection Pooling**: Efficient connection management
- **Query Optimization**: Index usage and query performance
- **Backup & Recovery**: Database backup strategies

### Testing Strategy

#### Current Testing Status
- **Unit Tests**: Not implemented
- **Integration Tests**: Not implemented
- **E2E Tests**: Not implemented
- **API Testing**: Manual testing with Postman/Insomnia

#### Recommended Testing Implementation
```bash
# Backend testing
npm install --save-dev jest supertest
npm install --save-dev @types/jest

# Frontend testing
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev vitest jsdom
```

#### Testing Priorities
1. **Backend API Tests**: Controller and route testing
2. **Database Tests**: Model and query testing
3. **Frontend Component Tests**: Component rendering and interaction
4. **Integration Tests**: API endpoint integration
5. **E2E Tests**: User workflow testing

### Code Quality & Linting

#### ESLint Configuration
```json
{
  "extends": [
    "eslint:recommended",
    "node:recommended"
  ],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "prefer-const": "error"
  }
}
```

#### Pre-commit Hooks
- **Code Formatting**: Prettier integration
- **Linting**: ESLint rule enforcement
- **Type Checking**: TypeScript validation (if implemented)
- **Test Running**: Automated test execution

### Debugging & Troubleshooting

#### Backend Debugging
```bash
# Enable debug logging
DEBUG=* npm run dev

# Database connection testing
mysql -u AradaBuy -p -h localhost

# API endpoint testing
curl -X GET http://localhost:5000/api/health
```

#### Frontend Debugging
```bash
# Enable React DevTools
# Install browser extension for Chrome/Firefox

# Enable Vite debugging
VITE_DEBUG=true npm run dev

# Component debugging
console.log('Component state:', state);
console.log('Props received:', props);
```

#### Common Debugging Scenarios
1. **Database Connection Issues**: Check credentials and MySQL status
2. **API Endpoint Errors**: Verify route configuration and middleware
3. **Frontend Rendering Issues**: Check component exports and imports
4. **Authentication Problems**: Verify JWT token and expiration
5. **CORS Issues**: Check backend CORS configuration

## 🚧 Current Status & Next Steps

### ✅ Completed Features
- [x] Backend API structure and database setup
- [x] User authentication (register/login)
- [x] Product CRUD operations
- [x] Order management system
- [x] Contact form handling
- [x] Frontend routing and basic pages
- [x] Shopping cart functionality
- [x] User authentication flow
- [x] Responsive UI with Tailwind CSS
- [x] Error handling and validation

### 🚧 In Progress / Partially Complete
- [x] Basic validation (only auth validators implemented)
- [x] UI components (implemented inline, not extracted)

### 🔄 Next Development Priorities

#### 1. Complete Validation System
Create comprehensive Joi validators for all endpoints:
```bash
# Files to create:
backend/validators/productValidators.js
backend/validators/orderValidators.js
backend/validators/contactValidators.js
```

#### 2. Extract Reusable UI Components
Create standalone components and refactor pages:
```bash
# Components to extract:
frontend/src/components/ProductCard.jsx
frontend/src/components/Button.jsx
frontend/src/components/Input.jsx
frontend/src/components/Modal.jsx
```

#### 3. Enhanced Features
- [ ] Product image upload and management
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search and filtering
- [ ] Inventory management
- [ ] Order tracking system
- [ ] User roles and permissions

#### 4. Testing & Quality
- [ ] Unit tests for backend controllers
- [ ] Integration tests for API endpoints
- [ ] Frontend component testing
- [ ] E2E testing with Cypress/Playwright
- [ ] API documentation with Swagger

#### 5. Performance & Security
- [ ] Database query optimization
- [ ] Redis caching for sessions
- [ ] Image optimization and CDN
- [ ] Security headers and CSP
- [ ] Rate limiting improvements
- [ ] Input sanitization

## 🐛 Troubleshooting

### Common Issues

#### Backend Won't Start
1. Check if MySQL is running
2. Verify `.env` file exists and has correct credentials
3. Ensure database user has proper permissions
4. Check if port 5000 is available

#### Database Connection Failed
1. Verify MySQL server is running
2. Check database credentials in `.env`
3. Ensure database user exists and has privileges
4. Check MySQL port (default: 3306)

#### Frontend White Screen
1. Check browser console for JavaScript errors
2. Verify backend is running and accessible
3. Check if all components are properly exported
4. Try hard refresh (Ctrl+F5)

#### Authentication Issues
1. Check JWT_SECRET in `.env`
2. Verify token expiration settings
3. Check if user exists in database
4. Verify password hashing is working

### Debug Mode
Enable detailed logging by setting `NODE_ENV=development` in `.env`

## 📝 Contributing

### Development Workflow
1. Create a feature branch from `main`
2. Implement changes with proper error handling
3. Test thoroughly (frontend + backend)
4. Update documentation if needed
5. Submit pull request with detailed description

### Code Standards
- Use meaningful variable and function names
- Add comments for complex logic
- Handle errors gracefully
- Follow existing code structure
- Test API endpoints before committing

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Team

- **Yosef** - Backend: Auth & Database Setup
- **Hawi** - Backend: Controllers & API Logic  
- **Siket** - Frontend: UI & Components
- **Nahom** - Frontend: Logic & API Integration

## 📞 Support

For development questions or issues:
1. Check this README first
2. Review the code comments
3. Check browser console and backend logs
4. Create an issue with detailed error description

---

**Happy Coding! 🚀**

*Last updated: December 2024*
