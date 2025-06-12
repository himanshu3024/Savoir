import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

// User Service
export class UserService {
  static async createUser(userData: {
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    phoneNumber?: string
    dateOfBirth?: string
  }) {
    const result = await sql`
      INSERT INTO users (firstName, lastName, email, passwordHash, phoneNumber, dateOfBirth)
      VALUES (${userData.firstName}, ${userData.lastName}, ${userData.email}, ${userData.passwordHash}, ${userData.phoneNumber || null}, ${userData.dateOfBirth || null})
      RETURNING id, firstName, lastName, email, role, createdAt
    `
    return result[0]
  }

  static async getUserByEmail(email: string) {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email} AND isActive = true
    `
    return result[0] || null
  }

  static async getUserById(id: number) {
    const result = await sql`
      SELECT id, firstName, lastName, email, role, phoneNumber, dateOfBirth, createdAt
      FROM users WHERE id = ${id} AND isActive = true
    `
    return result[0] || null
  }

  static async updateLastLogin(id: number) {
    await sql`
      UPDATE users SET lastLoginAt = CURRENT_TIMESTAMP WHERE id = ${id}
    `
  }
}

// Product Service
export class ProductService {
  static async getAllProducts(limit = 20, offset = 0) {
    const result = await sql`
      SELECT p.*, c.name as categoryName 
      FROM products p
      LEFT JOIN categories c ON p.categoryId = c.id
      WHERE p.isActive = true
      ORDER BY p.createdAt DESC
      LIMIT ${limit} OFFSET ${offset}
    `
    return result
  }

  static async getProductById(id: number) {
    const result = await sql`
      SELECT p.*, c.name as categoryName 
      FROM products p
      LEFT JOIN categories c ON p.categoryId = c.id
      WHERE p.id = ${id} AND p.isActive = true
    `
    return result[0] || null
  }

  static async getFeaturedProducts() {
    const result = await sql`
      SELECT p.*, c.name as categoryName 
      FROM products p
      LEFT JOIN categories c ON p.categoryId = c.id
      WHERE p.isFeatured = true AND p.isActive = true
      ORDER BY p.createdAt DESC
      LIMIT 8
    `
    return result
  }

  static async getProductsByCategory(categoryId: number) {
    const result = await sql`
      SELECT p.*, c.name as categoryName 
      FROM products p
      LEFT JOIN categories c ON p.categoryId = c.id
      WHERE p.categoryId = ${categoryId} AND p.isActive = true
      ORDER BY p.createdAt DESC
    `
    return result
  }

  static async createProduct(productData: any) {
    const result = await sql`
      INSERT INTO products (name, description, price, compareAtPrice, sku, categoryId, imageUrl, additionalImages, isFeatured, inventoryQuantity, weight, dimensions, tags)
      VALUES (${productData.name}, ${productData.description}, ${productData.price}, ${productData.compareAtPrice || null}, ${productData.sku}, ${productData.categoryId}, ${productData.imageUrl}, ${JSON.stringify(productData.additionalImages || [])}, ${productData.isFeatured || false}, ${productData.inventoryQuantity || 0}, ${productData.weight || null}, ${JSON.stringify(productData.dimensions || {})}, ${JSON.stringify(productData.tags || [])})
      RETURNING *
    `
    return result[0]
  }
}

// Category Service
export class CategoryService {
  static async getAllCategories() {
    const result = await sql`
      SELECT * FROM categories WHERE isActive = true ORDER BY sortOrder, name
    `
    return result
  }

  static async getCategoryById(id: number) {
    const result = await sql`
      SELECT * FROM categories WHERE id = ${id} AND isActive = true
    `
    return result[0] || null
  }

  static async createCategory(categoryData: any) {
    const result = await sql`
      INSERT INTO categories (name, description, slug, imageUrl, parentCategoryId, sortOrder)
      VALUES (${categoryData.name}, ${categoryData.description || null}, ${categoryData.slug}, ${categoryData.imageUrl || null}, ${categoryData.parentCategoryId || null}, ${categoryData.sortOrder || 0})
      RETURNING *
    `
    return result[0]
  }
}

// Order Service
export class OrderService {
  static async createOrder(orderData: any) {
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const result = await sql`
      INSERT INTO orders (userId, orderNumber, subtotal, tax, shipping, total, shippingAddressId, billingAddressId, paymentMethod, status, paymentStatus)
      VALUES (${orderData.userId}, ${orderNumber}, ${orderData.subtotal}, ${orderData.tax}, ${orderData.shipping}, ${orderData.total}, ${orderData.shippingAddressId}, ${orderData.billingAddressId}, ${orderData.paymentMethod}, 'pending', 'pending')
      RETURNING *
    `
    return result[0]
  }

  static async addOrderItems(orderId: number, items: any[]) {
    for (const item of items) {
      await sql`
        INSERT INTO orderitems (orderId, productId, quantity, price, total)
        VALUES (${orderId}, ${item.productId}, ${item.quantity}, ${item.price}, ${item.total})
      `
    }
  }

  static async getUserOrders(userId: number) {
    const result = await sql`
      SELECT o.*, 
             sa.addressLine1 as shippingAddress,
             ba.addressLine1 as billingAddress
      FROM orders o
      LEFT JOIN addresses sa ON o.shippingAddressId = sa.id
      LEFT JOIN addresses ba ON o.billingAddressId = ba.id
      WHERE o.userId = ${userId}
      ORDER BY o.createdAt DESC
    `
    return result
  }

  static async getOrderById(id: number) {
    const result = await sql`
      SELECT o.*, 
             sa.addressLine1 as shippingAddress,
             ba.addressLine1 as billingAddress
      FROM orders o
      LEFT JOIN addresses sa ON o.shippingAddressId = sa.id
      LEFT JOIN addresses ba ON o.billingAddressId = ba.id
      WHERE o.id = ${id}
    `
    return result[0] || null
  }
}

// Wishlist Service
export class WishlistService {
  static async addToWishlist(userId: number, productId: number) {
    try {
      const result = await sql`
        INSERT INTO wishlist (userId, productId)
        VALUES (${userId}, ${productId})
        RETURNING *
      `
      return result[0]
    } catch (error) {
      // Handle duplicate entry
      return null
    }
  }

  static async removeFromWishlist(userId: number, productId: number) {
    await sql`
      DELETE FROM wishlist WHERE userId = ${userId} AND productId = ${productId}
    `
  }

  static async getUserWishlist(userId: number) {
    const result = await sql`
      SELECT w.*, p.name, p.price, p.imageUrl, p.compareAtPrice
      FROM wishlist w
      JOIN products p ON w.productId = p.id
      WHERE w.userId = ${userId} AND p.isActive = true
      ORDER BY w.createdAt DESC
    `
    return result
  }
}

// Review Service
export class ReviewService {
  static async createReview(reviewData: any) {
    const result = await sql`
      INSERT INTO reviews (productId, userId, rating, title, comment, isVerifiedPurchase)
      VALUES (${reviewData.productId}, ${reviewData.userId}, ${reviewData.rating}, ${reviewData.title || null}, ${reviewData.comment || null}, ${reviewData.isVerifiedPurchase || false})
      RETURNING *
    `
    return result[0]
  }

  static async getProductReviews(productId: number) {
    const result = await sql`
      SELECT r.*, u.firstName, u.lastName
      FROM reviews r
      JOIN users u ON r.userId = u.id
      WHERE r.productId = ${productId} AND r.isApproved = true
      ORDER BY r.createdAt DESC
    `
    return result
  }

  static async getAverageRating(productId: number) {
    const result = await sql`
      SELECT AVG(rating)::numeric(3,2) as averageRating, COUNT(*) as totalReviews
      FROM reviews
      WHERE productId = ${productId} AND isApproved = true
    `
    return result[0]
  }
}
