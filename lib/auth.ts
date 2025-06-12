import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { UserService } from "./database"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here"

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  static generateToken(payload: any): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET)
    } catch (error) {
      return null
    }
  }

  static async register(userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string
    dateOfBirth?: string
  }) {
    // Check if user already exists
    const existingUser = await UserService.getUserByEmail(userData.email)
    if (existingUser) {
      throw new Error("User already exists with this email")
    }

    // Hash password
    const passwordHash = await this.hashPassword(userData.password)

    // Create user
    const user = await UserService.createUser({
      ...userData,
      passwordHash,
    })

    // Generate token
    const token = this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    return { user, token }
  }

  static async login(email: string, password: string) {
    // Get user
    const user = await UserService.getUserByEmail(email)
    if (!user) {
      throw new Error("Invalid credentials")
    }

    // Verify password
    const isValidPassword = await this.verifyPassword(password, user.passwordhash)
    if (!isValidPassword) {
      throw new Error("Invalid credentials")
    }

    // Update last login
    await UserService.updateLastLogin(user.id)

    // Generate token
    const token = this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    // Remove password from response
    const { passwordhash, ...userWithoutPassword } = user

    return { user: userWithoutPassword, token }
  }
}
