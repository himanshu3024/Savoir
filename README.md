# SAVOIR - Luxury E-commerce Platform

A world-class, full-stack e-commerce platform built with cutting-edge technologies and award-worthy design principles. SAVOIR represents the pinnacle of modern web development, combining stunning visuals with robust functionality.

## 🌟 Features

### Frontend Excellence
- **Ultra-Modern Design**: Award-worthy UI/UX with gradient backgrounds, glass morphism, and smooth animations
- **Responsive Design**: Pixel-perfect across all devices and screen sizes
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Advanced Product Filtering**: Real-time search, category filters, and sorting
- **Shopping Cart**: Full cart management with quantity updates and price calculations
- **Authentication Flow**: Complete login/signup with form validation
- **Product Showcase**: Detailed product pages with image galleries and reviews

### Backend Architecture
- **RESTful API**: Clean, scalable API endpoints
- **Authentication System**: Secure user registration and login
- **Product Management**: CRUD operations for products
- **Cart Management**: Add, update, remove cart items
- **Database Ready**: Structured for Azure SQL Database integration

### Technical Stack
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui for consistent, accessible components
- **Backend**: Next.js API Routes, Node.js
- **Database**: Azure SQL Database (configured)
- **Styling**: Modern CSS with gradients, animations, and responsive design
- **Icons**: Lucide React for consistent iconography

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Azure SQL Database (optional for full backend)

### Installation

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd savoir-ecommerce
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Environment Setup**
Create a \`.env.local\` file in the root directory:
\`\`\`env
# Azure SQL Database Configuration
AZURE_SQL_SERVER=your-server.database.windows.net
AZURE_SQL_DATABASE=savoir_db
AZURE_SQL_USERNAME=your-username
AZURE_SQL_PASSWORD=your-password
AZURE_SQL_PORT=1433

# Authentication
JWT_SECRET=your-super-secret-jwt-key
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Optional: External Services
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
\`\`\`

4. **Run the development server**
\`\`\`bash
npm run dev
\`\`\`

5. **Open your browser**
Navigate to \`http://localhost:3000\` to see the application.

## 📁 Project Structure

\`\`\`
savoir-ecommerce/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── products/             # Product management
│   │   └── cart/                 # Cart operations
│   ├── auth/                     # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── products/                 # Product pages
│   │   ├── [id]/                 # Dynamic product detail
│   │   └── page.tsx              # Products listing
│   ├── cart/                     # Shopping cart
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── layout/                   # Layout components
│   │   ├── header.tsx
│   │   └── footer.tsx
│   └── ui/                       # shadcn/ui components
├── lib/                          # Utility functions
├── public/                       # Static assets
└── README.md
\`\`\`

## 🎨 Design Philosophy

### Visual Excellence
- **Color Palette**: Sophisticated gradients from purple to blue with elegant grays
- **Typography**: Clean, modern fonts with proper hierarchy
- **Spacing**: Consistent spacing system for visual harmony
- **Animations**: Subtle, purposeful animations that enhance UX

### User Experience
- **Intuitive Navigation**: Clear, logical navigation structure
- **Fast Loading**: Optimized images and code splitting
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Mobile-First**: Responsive design that works on all devices

## 🛠 API Endpoints

### Authentication
- \`POST /api/auth/login\` - User login
- \`POST /api/auth/signup\` - User registration
- \`POST /api/auth/logout\` - User logout

### Products
- \`GET /api/products\` - Get all products (with filtering)
- \`GET /api/products/[id]\` - Get single product
- \`POST /api/products\` - Create product (admin)
- \`PUT /api/products/[id]\` - Update product (admin)
- \`DELETE /api/products/[id]\` - Delete product (admin)

### Cart
- \`GET /api/cart\` - Get cart items
- \`POST /api/cart\` - Add item to cart
- \`PUT /api/cart\` - Update cart item
- \`DELETE /api/cart\` - Remove cart item

## 🗄 Database Schema

### Users Table
\`\`\`sql
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    firstName NVARCHAR(50) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    passwordHash NVARCHAR(255) NOT NULL,
    role NVARCHAR(20) DEFAULT 'customer',
    createdAt DATETIME2 DEFAULT GETDATE(),
    updatedAt DATETIME2 DEFAULT GETDATE()
);
\`\`\`

### Products Table
\`\`\`sql
CREATE TABLE Products (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    description NTEXT,
    price DECIMAL(10,2) NOT NULL,
    originalPrice DECIMAL(10,2),
    category NVARCHAR(100),
    imageUrl NVARCHAR(500),
    inStock BIT DEFAULT 1,
    stockCount INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    reviewCount INT DEFAULT 0,
    createdAt DATETIME2 DEFAULT GETDATE(),
    updatedAt DATETIME2 DEFAULT GETDATE()
);
\`\`\`

### Cart Table
\`\`\`sql
CREATE TABLE Cart (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT FOREIGN KEY REFERENCES Users(id),
    productId INT FOREIGN KEY REFERENCES Products(id),
    quantity INT NOT NULL DEFAULT 1,
    createdAt DATETIME2 DEFAULT GETDATE(),
    updatedAt DATETIME2 DEFAULT GETDATE()
);
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Azure App Service
1. Create an Azure App Service
2. Configure deployment from GitHub
3. Set up environment variables
4. Configure Azure SQL Database connection

### Manual Deployment
\`\`\`bash
npm run build
npm start
\`\`\`

## 🔧 Development

### Available Scripts
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint
- \`npm run type-check\` - Run TypeScript checks

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks

## 🎯 Key Features Showcase

### Homepage
- Hero section with gradient background and floating animations
- Featured products with hover effects
- Newsletter subscription
- Trust indicators (shipping, security, support)

### Products Page
- Advanced filtering and sorting
- Grid/list view toggle
- Real-time search
- Responsive product cards

### Product Detail
- Image gallery with thumbnails
- Detailed specifications
- Customer reviews
- Related products
- Add to cart functionality

### Shopping Cart
- Quantity management
- Price calculations
- Promo code support
- Shipping calculator
- Secure checkout flow

### Authentication
- Modern login/signup forms
- Form validation
- Social login options
- Password strength indicators

## 🏆 Why This Project Stands Out

1. **Professional Design**: Award-worthy visual design that impresses at first glance
2. **Technical Excellence**: Modern tech stack with best practices
3. **Scalable Architecture**: Clean, maintainable code structure
4. **Performance Optimized**: Fast loading and smooth interactions
5. **Mobile-First**: Perfect responsive design
6. **Accessibility**: WCAG compliant and inclusive
7. **Production Ready**: Complete with API, database, and deployment configs

## 📞 Support

For questions or support, please contact:
- Email: support@savoir.com
- Documentation: [Project Wiki]
- Issues: [GitHub Issues]

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**SAVOIR** - Where luxury meets technology. Built with ❤️ for the modern web.
\`\`\`
