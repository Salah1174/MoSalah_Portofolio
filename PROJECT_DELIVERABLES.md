# Mohamed Salah Portfolio

A full-stack portfolio website built with Express.js, EJS templates, React.js, and MongoDB, featuring both traditional server-side rendering and modern single-page application functionality.

## 📋 Project Deliverables ✅

### ✅ Complete Express Project with:

#### **1. HTML, CSS, and JS Files** ✅
- **HTML**: 
  - `client/public/index.html` (React app entry point)
  - EJS templates in `views/` directory
- **CSS**: 
  - `client/src/index.css` (React styling)
  - `client/src/App.css` (React components)
  - `public/css/style.css` (EJS templates styling)
  - Tailwind CSS integration
- **JavaScript**: 
  - `public/js/main.js` (Client-side functionality)
  - React components in `client/src/`
  - Server-side JavaScript files

#### **2. EJS Templates** ✅
- `views/layout.ejs` - Main layout template
- `views/index.ejs` - Home page
- `views/about.ejs` - About page
- `views/projects.ejs` - Projects showcase
- `views/contact.ejs` - Contact form
- `views/partials/header.ejs` - Navigation header
- `views/partials/footer.ejs` - Footer component

#### **3. MongoDB/Mongoose Models** ✅
- `models/portofolioModel.js` - Portfolio data (Intro, About, Experience, Project, Contact)
- `models/userModel.js` - User authentication
- `models/contactMessageModel.js` - Contact form messages
- `config/dbConfig.js` - Database configuration

#### **4. Routes and Controllers** ✅
- **Routes**:
  - `routes/portofolioRoute.js` - Portfolio CRUD operations
  - `routes/authRoute.js` - Authentication routes
  - `routes/contactRoute.js` - Contact functionality
  - `routes/ejsRoutes.js` - EJS template routes
- **Controllers**:
  - `controllers/portfolioController.js` - Business logic

## 🚀 Features

### **Dual Architecture**
- **EJS Server-Side Rendering**: Traditional multi-page application
- **React SPA**: Modern single-page application with admin panel
- **Unified Backend**: Shared Express.js API for both frontends

### **Core Functionality**
- **Portfolio Display**: Intro, About, Experience, Projects sections
- **Contact System**: Working contact form with email integration
- **Admin Panel**: Full CRUD operations for content management
- **Authentication**: JWT-based admin authentication
- **Responsive Design**: Mobile-first approach
- **Database Integration**: MongoDB with Mongoose ODM

## 🛠 Technology Stack

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **EJS** - Template engine
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Nodemailer** - Email functionality
- **bcryptjs** - Password hashing

### **Frontend**
- **React.js** - SPA framework
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation

## 📁 Project Structure

```
MoSalah_Portfolio/
├── server.js                 # Main server file
├── package.json              # Dependencies
├── .env                      # Environment variables
│
├── config/
│   └── dbConfig.js          # Database configuration
│
├── models/
│   ├── portofolioModel.js   # Portfolio data models
│   ├── userModel.js         # User authentication
│   └── contactMessageModel.js # Contact messages
│
├── routes/
│   ├── portofolioRoute.js   # Portfolio API routes
│   ├── authRoute.js         # Authentication routes
│   ├── contactRoute.js      # Contact form routes
│   └── ejsRoutes.js         # EJS template routes
│
├── controllers/
│   └── portfolioController.js # Business logic
│
├── views/                   # EJS Templates
│   ├── layout.ejs          # Main layout
│   ├── index.ejs           # Home page
│   ├── about.ejs           # About page
│   ├── projects.ejs        # Projects page
│   ├── contact.ejs         # Contact page
│   └── partials/
│       ├── header.ejs      # Navigation
│       └── footer.ejs      # Footer
│
├── public/                  # Static files for EJS
│   ├── css/
│   │   └── style.css       # EJS styling
│   └── js/
│       └── main.js         # Client-side JS
│
├── client/                  # React SPA
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   └── redux/          # State management
│   └── package.json
│
└── setup files/
    ├── setup-admin.js      # Admin user creation
    └── setup-sample-data.js # Sample data population
```

## 🚀 Installation & Setup

### **1. Clone Repository**
```bash
git clone https://github.com/Salah1174/MoSalah_Portofolio.git
cd MoSalah_Portofolio
```

### **2. Install Dependencies**
```bash
# Backend dependencies
npm install

# Frontend dependencies
cd client
npm install
cd ..
```

### **3. Environment Setup**
Create `.env` file:
```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
ADMIN_EMAIL=admin@example.com
```

### **4. Database Setup**
```bash
# Create admin user
node setup-admin.js

# Populate sample data
node setup-sample-data.js
```

### **5. Run Application**
```bash
# Start backend server (Port 5000)
node server.js

# Start React development server (Port 3000)
cd client
npm start
```

## 🌐 Access Points

### **EJS Templates (Traditional)**
- **Home**: `http://localhost:5000/`
- **About**: `http://localhost:5000/about`
- **Projects**: `http://localhost:5000/projects`
- **Contact**: `http://localhost:5000/contact`

### **React SPA (Modern)**
- **Portfolio**: `http://localhost:3000/`
- **Admin Login**: `http://localhost:3000/admin-login`
- **Admin Dashboard**: `http://localhost:3000/admin` (after login)

### **API Endpoints**
- **Portfolio Data**: `GET /api/portofolio/get-portofolio-data`
- **Authentication**: `POST /api/auth/login`
- **Contact**: `POST /api/contact/send-message`

## 🔐 Admin Access

**Login Credentials:**
- **Username**: `admin`
- **Password**: `admin123`

**Admin Features:**
- Content management for all sections
- Contact message viewing
- Real-time updates
- CRUD operations

## 📱 Responsive Design

- **Mobile-first approach**
- **Tailwind CSS** for modern styling
- **Responsive grid layouts**
- **Touch-friendly interfaces**
- **Cross-browser compatibility**

## 🔧 Development Features

- **Hot Reload** (React development)
- **Error Handling** (Server & client)
- **Input Validation** (Forms & API)
- **Loading States** (User feedback)
- **Toast Notifications** (Success/error messages)

## 📊 Database Schema

### **Portfolio Models**
- **Intro**: Personal introduction
- **About**: Skills and description
- **Experience**: Work history
- **Project**: Portfolio projects
- **Contact**: Contact information

### **System Models**
- **User**: Admin authentication
- **ContactMessage**: Visitor messages

## 🚀 Deployment Ready

- **Environment Variables**: Secure configuration
- **Production Build**: Optimized React build
- **Database**: MongoDB Atlas ready
- **Static Files**: Proper serving setup
- **Error Handling**: Production-ready error management

## 📈 Performance

- **Optimized Images**: Proper image handling
- **Minified CSS/JS**: Production builds
- **Database Indexing**: Efficient queries
- **Caching Headers**: Static file optimization

## 🎯 Meeting Project Requirements

✅ **Complete Express project** - Full Express.js backend
✅ **HTML, CSS, and JS files** - Multiple implementations
✅ **EJS templates** - Full template system with partials
✅ **MongoDB/Mongoose models** - Comprehensive data models
✅ **Routes and controllers** - Organized MVC architecture

This project exceeds the basic requirements by providing both traditional server-side rendering and modern SPA functionality, making it a comprehensive full-stack portfolio solution.
