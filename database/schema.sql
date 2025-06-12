-- SAVOIR E-commerce Database Schema for Azure SQL Database

-- Create Users table
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    firstName NVARCHAR(50) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    passwordHash NVARCHAR(255) NOT NULL,
    role NVARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'moderator')),
    emailVerified BIT DEFAULT 0,
    phoneNumber NVARCHAR(20),
    dateOfBirth DATE,
    createdAt DATETIME2 DEFAULT GETDATE(),
    updatedAt DATETIME2 DEFAULT GETDATE(),
    lastLoginAt DATETIME2,
    isActive BIT DEFAULT 1
);

-- Create Categories table
CREATE TABLE Categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL UNIQUE,
    description NTEXT,
    slug NVARCHAR(100) NOT NULL UNIQUE,
    imageUrl NVARCHAR(500),
    parentCategoryId INT NULL,
    isActive BIT DEFAULT 1,
    sortOrder INT DEFAULT 0,
    createdAt DATETIME2 DEFAULT GETDATE(),
    updatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (parentCategoryId) REFERENCES Categories(id)
);

-- Create Products table
CREATE TABLE Products (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    description NTEXT,
    shortDescription NVARCHAR(500),
    price DECIMAL(10,2) NOT NULL,
    originalPrice DECIMAL(10,2),
    costPrice DECIMAL(10,2),
    sku NVARCHAR(100) UNIQUE,
    categoryId INT,
    brand NVARCHAR(100),
    weight DECIMAL(8,2),
    dimensions NVARCHAR(100),
    color NVARCHAR(50),
    size NVARCHAR(50),
    material NVARCHAR(100),
    inStock BIT DEFAULT 1,
    stockCount INT DEFAULT 0,
    lowStockThreshold INT DEFAULT 5,
    rating DECIMAL(3,2) DEFAULT 0,
    reviewCount INT DEFAULT 0,
    totalSales INT DEFAULT 0,
    isActive BIT DEFAULT 1,
    isFeatured BIT DEFAULT 0,
    metaTitle NVARCHAR(255),
    metaDescription NVARCHAR(500),
    tags NVARCHAR(500),
    createdAt DATETIME2 DEFAULT GETDATE(),
    updatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (categoryId) REFERENCES Categories(id)
);

-- Create ProductImages table
CREATE TABLE ProductImages (
    id INT IDENTITY(1,1) PRIMARY KEY,
    productId INT NOT NULL,
    imageUrl NVARCHAR(500) NOT NULL,
    altText NVARCHAR(255),
    isPrimary BIT DEFAULT 0,
    sortOrder INT DEFAULT 0,
    createdAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (productId) REFERENCES Products(id) ON DELETE CASCADE
);

-- Create ProductVariants table
CREATE TABLE ProductVariants (
    id INT IDENTITY(1,1) PRIMARY KEY,
    productId INT NOT NULL,
    name NVARCHAR(100) NOT NULL,
    value NVARCHAR(100) NOT NULL,
    priceAdjustment DECIMAL(10,2) DEFAULT 0,
    stockCount INT DEFAULT 0,
    sku NVARCHAR(100),
    isActive BIT DEFAULT 1,
    createdAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (productId) REFERENCES Products(id) ON DELETE CASCADE
);

-- Create Cart table
CREATE TABLE Cart (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT,
    sessionId NVARCHAR(255),
    productId INT NOT NULL,
    variantId INT,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    createdAt DATETIME2 DEFAULT GETDATE(),
    updatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES Products(id) ON DELETE CASCADE,
    FOREIGN KEY (variantId) REFERENCES ProductVariants(id)
);

-- Create Wishlist table
CREATE TABLE Wishlist (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    productId INT NOT NULL,
    createdAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES Products(id) ON DELETE CASCADE,
    UNIQUE(userId, productId)
);

-- Create Orders table
CREATE TABLE Orders (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT,
    orderNumber NVARCHAR(50) UNIQUE NOT NULL,
    status NVARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
    subtotal DECIMAL(10,2) NOT NULL,
    taxAmount DECIMAL(10,2) DEFAULT 0,
    shippingAmount DECIMAL(10,2) DEFAULT 0,
    discountAmount DECIMAL(10,2) DEFAULT 0,
    totalAmount DECIMAL(10,2) NOT NULL,
    currency NVARCHAR(3) DEFAULT 'USD',
    paymentStatus NVARCHAR(20) DEFAULT 'pending' CHECK (paymentStatus IN ('pending', 'paid', 'failed', 'refunded')),
    paymentMethod NVARCHAR(50),
    paymentIntentId NVARCHAR(255),
    shippingAddress NTEXT,
    billingAddress NTEXT,
    customerNotes NTEXT,
    adminNotes NTEXT,
    shippedAt DATETIME2,
    deliveredAt DATETIME2,
    createdAt DATETIME2 DEFAULT GETDATE(),
    updatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id)
);

-- Create OrderItems table
CREATE TABLE OrderItems (
    id INT IDENTITY(1,1) PRIMARY KEY,
    orderId INT NOT NULL,
    productId INT NOT NULL,
    variantId INT,
    productName NVARCHAR(255) NOT NULL,
    productSku NVARCHAR(100),
    quantity INT NOT NULL,
    unitPrice DECIMAL(10,2) NOT NULL,
    totalPrice DECIMAL(10,2) NOT NULL,
    createdAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (orderId) REFERENCES Orders(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES Products(id),
    FOREIGN KEY (variantId) REFERENCES ProductVariants(id)
);

-- Create Reviews table
CREATE TABLE Reviews (
    id INT IDENTITY(1,1) PRIMARY KEY,
    productId INT NOT NULL,
    userId INT NOT NULL,
    orderId INT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title NVARCHAR(255),
    comment NTEXT,
    isVerifiedPurchase BIT DEFAULT 0,
    isApproved BIT DEFAULT 0,
    helpfulCount INT DEFAULT 0,
    createdAt DATETIME2 DEFAULT GETDATE(),
    updatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (productId) REFERENCES Products(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (orderId) REFERENCES Orders(id)
);

-- Create Addresses table
CREATE TABLE Addresses (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    type NVARCHAR(20) DEFAULT 'shipping' CHECK (type IN ('shipping', 'billing')),
    firstName NVARCHAR(50) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    company NVARCHAR(100),
    addressLine1 NVARCHAR(255) NOT NULL,
    addressLine2 NVARCHAR(255),
    city NVARCHAR(100) NOT NULL,
    state NVARCHAR(100) NOT NULL,
    postalCode NVARCHAR(20) NOT NULL,
    country NVARCHAR(100) NOT NULL,
    phoneNumber NVARCHAR(20),
    isDefault BIT DEFAULT 0,
    createdAt DATETIME2 DEFAULT GETDATE(),
    updatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Create Coupons table
CREATE TABLE Coupons (
    id INT IDENTITY(1,1) PRIMARY KEY,
    code NVARCHAR(50) UNIQUE NOT NULL,
    description NVARCHAR(255),
    type NVARCHAR(20) DEFAULT 'percentage' CHECK (type IN ('percentage', 'fixed', 'free_shipping')),
    value DECIMAL(10,2) NOT NULL,
    minimumAmount DECIMAL(10,2) DEFAULT 0,
    maximumDiscount DECIMAL(10,2),
    usageLimit INT,
    usedCount INT DEFAULT 0,
    isActive BIT DEFAULT 1,
    startsAt DATETIME2,
    expiresAt DATETIME2,
    createdAt DATETIME2 DEFAULT GETDATE(),
    updatedAt DATETIME2 DEFAULT GETDATE()
);

-- Create UserSessions table for tracking user activity
CREATE TABLE UserSessions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT,
    sessionId NVARCHAR(255) NOT NULL,
    ipAddress NVARCHAR(45),
    userAgent NTEXT,
    isActive BIT DEFAULT 1,
    lastActivity DATETIME2 DEFAULT GETDATE(),
    createdAt DATETIME2 DEFAULT GETDATE(),
    expiresAt DATETIME2,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Create ProductViews table for analytics
CREATE TABLE ProductViews (
    id INT IDENTITY(1,1) PRIMARY KEY,
    productId INT NOT NULL,
    userId INT,
    sessionId NVARCHAR(255),
    ipAddress NVARCHAR(45),
    userAgent NTEXT,
    referrer NVARCHAR(500),
    viewedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (productId) REFERENCES Products(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE SET NULL
);

-- Create Notifications table
CREATE TABLE Notifications (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    type NVARCHAR(50) NOT NULL,
    title NVARCHAR(255) NOT NULL,
    message NTEXT NOT NULL,
    isRead BIT DEFAULT 0,
    actionUrl NVARCHAR(500),
    createdAt DATETIME2 DEFAULT GETDATE(),
    readAt DATETIME2,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IX_Products_CategoryId ON Products(categoryId);
CREATE INDEX IX_Products_IsActive_IsFeatured ON Products(isActive, isFeatured);
CREATE INDEX IX_Products_Price ON Products(price);
CREATE INDEX IX_Products_CreatedAt ON Products(createdAt);
CREATE INDEX IX_ProductImages_ProductId ON ProductImages(productId);
CREATE INDEX IX_Cart_UserId ON Cart(userId);
CREATE INDEX IX_Cart_SessionId ON Cart(sessionId);
CREATE INDEX IX_Wishlist_UserId ON Wishlist(userId);
CREATE INDEX IX_Orders_UserId ON Orders(userId);
CREATE INDEX IX_Orders_Status ON Orders(status);
CREATE INDEX IX_Orders_CreatedAt ON Orders(createdAt);
CREATE INDEX IX_OrderItems_OrderId ON OrderItems(orderId);
CREATE INDEX IX_Reviews_ProductId ON Reviews(productId);
CREATE INDEX IX_Reviews_UserId ON Reviews(userId);
CREATE INDEX IX_ProductViews_ProductId ON ProductViews(productId);
CREATE INDEX IX_ProductViews_ViewedAt ON ProductViews(viewedAt);

-- Insert sample categories
INSERT INTO Categories (name, description, slug, imageUrl) VALUES
('Electronics', 'Latest gadgets and electronic devices', 'electronics', '/placeholder.svg?height=300&width=300'),
('Audio & Headphones', 'Premium sound experience', 'audio-headphones', '/placeholder.svg?height=300&width=300'),
('Photography', 'Professional cameras and accessories', 'photography', '/placeholder.svg?height=300&width=300'),
('Wearables', 'Smart watches and fitness trackers', 'wearables', '/placeholder.svg?height=300&width=300'),
('Gaming', 'Gaming accessories and peripherals', 'gaming', '/placeholder.svg?height=300&width=300'),
('Computers', 'Laptops, desktops and accessories', 'computers', '/placeholder.svg?height=300&width=300'),
('Accessories', 'Premium accessories and lifestyle products', 'accessories', '/placeholder.svg?height=300&width=300'),
('Furniture', 'Modern and ergonomic furniture', 'furniture', '/placeholder.svg?height=300&width=300');

-- Insert sample products
INSERT INTO Products (name, description, shortDescription, price, originalPrice, categoryId, brand, inStock, stockCount, rating, reviewCount, isFeatured, tags) VALUES
('Premium Wireless Headphones', 'Experience unparalleled audio quality with our premium wireless headphones. Featuring advanced noise cancellation technology, premium materials, and exceptional comfort for extended listening sessions.', 'High-quality wireless headphones with noise cancellation', 299.99, 399.99, 2, 'AudioTech', 1, 15, 4.8, 2847, 1, 'wireless,headphones,noise-cancellation,premium'),
('Smart Fitness Watch', 'Advanced fitness tracking with heart rate monitoring, GPS, and smart notifications. Perfect for athletes and fitness enthusiasts.', 'Advanced fitness tracking with heart rate monitoring', 249.99, 329.99, 4, 'FitTech', 1, 8, 4.9, 1923, 1, 'smartwatch,fitness,health,gps'),
('Professional Camera Lens', 'Professional-grade camera lens for stunning photography. Compatible with major camera brands and perfect for both amateur and professional photographers.', 'Professional-grade camera lens for stunning photography', 899.99, 1199.99, 3, 'LensMaster', 1, 5, 4.7, 856, 1, 'camera,lens,photography,professional'),
('Luxury Leather Wallet', 'Handcrafted leather wallet with RFID protection. Made from premium Italian leather with multiple card slots and bill compartments.', 'Handcrafted leather wallet with RFID protection', 129.99, 179.99, 7, 'LeatherCraft', 0, 0, 4.6, 1245, 0, 'wallet,leather,rfid,luxury'),
('Ergonomic Office Chair', 'Ergonomic design for maximum comfort and productivity. Features adjustable height, lumbar support, and premium materials.', 'Ergonomic design for maximum comfort and productivity', 449.99, 599.99, 8, 'ComfortSeating', 1, 12, 4.8, 967, 1, 'chair,office,ergonomic,furniture'),
('Wireless Charging Pad', 'Fast wireless charging for all compatible devices. Sleek design with LED indicators and overcharge protection.', 'Fast wireless charging for all compatible devices', 79.99, 99.99, 1, 'ChargeTech', 1, 25, 4.5, 1567, 0, 'wireless,charging,fast,electronics');

-- Insert sample product images
INSERT INTO ProductImages (productId, imageUrl, altText, isPrimary, sortOrder) VALUES
(1, '/placeholder.svg?height=600&width=600', 'Premium Wireless Headphones - Main View', 1, 1),
(1, '/placeholder.svg?height=600&width=600', 'Premium Wireless Headphones - Side View', 0, 2),
(1, '/placeholder.svg?height=600&width=600', 'Premium Wireless Headphones - Detail View', 0, 3),
(2, '/placeholder.svg?height=600&width=600', 'Smart Fitness Watch - Main View', 1, 1),
(2, '/placeholder.svg?height=600&width=600', 'Smart Fitness Watch - Interface View', 0, 2),
(3, '/placeholder.svg?height=600&width=600', 'Professional Camera Lens - Main View', 1, 1),
(4, '/placeholder.svg?height=600&width=600', 'Luxury Leather Wallet - Main View', 1, 1),
(5, '/placeholder.svg?height=600&width=600', 'Ergonomic Office Chair - Main View', 1, 1),
(6, '/placeholder.svg?height=600&width=600', 'Wireless Charging Pad - Main View', 1, 1);

-- Insert sample admin user
INSERT INTO Users (firstName, lastName, email, passwordHash, role, emailVerified, isActive) VALUES
('Admin', 'User', 'admin@savoir.com', '$2b$10$rOzJqQZQQZQZQZQZQZQZQu', 'admin', 1, 1);

-- Insert sample customer
INSERT INTO Users (firstName, lastName, email, passwordHash, role, emailVerified, isActive) VALUES
('Demo', 'Customer', 'demo@savoir.com', '$2b$10$rOzJqQZQQZQZQZQZQZQZQu', 'customer', 1, 1);

-- Insert sample coupons
INSERT INTO Coupons (code, description, type, value, minimumAmount, usageLimit, isActive, expiresAt) VALUES
('SAVE10', '10% off your order', 'percentage', 10.00, 50.00, 1000, 1, DATEADD(month, 3, GETDATE())),
('WELCOME20', '20% off for new customers', 'percentage', 20.00, 100.00, 500, 1, DATEADD(month, 6, GETDATE())),
('FREESHIP', 'Free shipping on any order', 'free_shipping', 0.00, 0.00, NULL, 1, DATEADD(year, 1, GETDATE()));
