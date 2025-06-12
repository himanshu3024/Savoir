import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

async function seedData() {
  try {
    console.log("Starting data seeding...")

    // Seed Categories
    const categories = [
      {
        name: "Luxury Watches",
        slug: "luxury-watches",
        description: "Premium timepieces for the discerning individual",
      },
      {
        name: "Designer Jewelry",
        slug: "designer-jewelry",
        description: "Exquisite jewelry pieces from renowned designers",
      },
      {
        name: "Premium Accessories",
        slug: "premium-accessories",
        description: "High-end accessories for the modern lifestyle",
      },
      { name: "Exclusive Bags", slug: "exclusive-bags", description: "Luxury handbags and leather goods" },
      { name: "Fine Fragrances", slug: "fine-fragrances", description: "Sophisticated scents for every occasion" },
    ]

    for (const category of categories) {
      await sql`
        INSERT INTO categories (name, slug, description, imageUrl, isActive, sortOrder)
        VALUES (${category.name}, ${category.slug}, ${category.description}, '/placeholder.svg?height=300&width=300', true, 0)
        ON CONFLICT (slug) DO NOTHING
      `
    }

    // Get category IDs
    const categoryResults = await sql`SELECT id, slug FROM categories`
    const categoryMap = categoryResults.reduce((acc: any, cat: any) => {
      acc[cat.slug] = cat.id
      return acc
    }, {})

    // Seed Products
    const products = [
      {
        name: "Rolex Submariner",
        description: "Iconic diving watch with exceptional precision and style",
        price: 8500.0,
        compareAtPrice: 9000.0,
        sku: "ROL-SUB-001",
        categoryId: categoryMap["luxury-watches"],
        imageUrl: "/placeholder.svg?height=400&width=400",
        isFeatured: true,
        inventoryQuantity: 5,
        weight: 0.15,
        tags: ["luxury", "diving", "swiss", "automatic"],
      },
      {
        name: "Cartier Love Bracelet",
        description: "Timeless symbol of love in 18k gold",
        price: 6750.0,
        compareAtPrice: 7200.0,
        sku: "CAR-LOV-001",
        categoryId: categoryMap["designer-jewelry"],
        imageUrl: "/placeholder.svg?height=400&width=400",
        isFeatured: true,
        inventoryQuantity: 8,
        weight: 0.05,
        tags: ["cartier", "gold", "bracelet", "luxury"],
      },
      {
        name: "Hermès Silk Scarf",
        description: "Hand-rolled silk scarf with exclusive print",
        price: 425.0,
        compareAtPrice: 450.0,
        sku: "HER-SCA-001",
        categoryId: categoryMap["premium-accessories"],
        imageUrl: "/placeholder.svg?height=400&width=400",
        isFeatured: false,
        inventoryQuantity: 15,
        weight: 0.02,
        tags: ["hermes", "silk", "scarf", "luxury"],
      },
      {
        name: "Louis Vuitton Neverfull",
        description: "Iconic tote bag in Monogram canvas",
        price: 1750.0,
        compareAtPrice: 1850.0,
        sku: "LV-NEV-001",
        categoryId: categoryMap["exclusive-bags"],
        imageUrl: "/placeholder.svg?height=400&width=400",
        isFeatured: true,
        inventoryQuantity: 12,
        weight: 0.8,
        tags: ["louis-vuitton", "tote", "monogram", "luxury"],
      },
      {
        name: "Tom Ford Oud Wood",
        description: "Sophisticated woody fragrance with oud and sandalwood",
        price: 285.0,
        compareAtPrice: 320.0,
        sku: "TF-OUD-001",
        categoryId: categoryMap["fine-fragrances"],
        imageUrl: "/placeholder.svg?height=400&width=400",
        isFeatured: false,
        inventoryQuantity: 25,
        weight: 0.3,
        tags: ["tom-ford", "oud", "woody", "luxury"],
      },
      {
        name: "Omega Speedmaster",
        description: "Legendary moonwatch with chronograph function",
        price: 5200.0,
        compareAtPrice: 5500.0,
        sku: "OME-SPE-001",
        categoryId: categoryMap["luxury-watches"],
        imageUrl: "/placeholder.svg?height=400&width=400",
        isFeatured: true,
        inventoryQuantity: 7,
        weight: 0.18,
        tags: ["omega", "chronograph", "moonwatch", "swiss"],
      },
      {
        name: "Tiffany & Co. Diamond Ring",
        description: "Classic solitaire diamond ring in platinum",
        price: 12500.0,
        compareAtPrice: 13000.0,
        sku: "TIF-DIA-001",
        categoryId: categoryMap["designer-jewelry"],
        imageUrl: "/placeholder.svg?height=400&width=400",
        isFeatured: true,
        inventoryQuantity: 3,
        weight: 0.01,
        tags: ["tiffany", "diamond", "platinum", "engagement"],
      },
      {
        name: "Gucci Leather Belt",
        description: "Premium leather belt with signature GG buckle",
        price: 450.0,
        compareAtPrice: 480.0,
        sku: "GUC-BEL-001",
        categoryId: categoryMap["premium-accessories"],
        imageUrl: "/placeholder.svg?height=400&width=400",
        isFeatured: false,
        inventoryQuantity: 20,
        weight: 0.3,
        tags: ["gucci", "leather", "belt", "luxury"],
      },
    ]

    for (const product of products) {
      await sql`
        INSERT INTO products (name, description, price, compareAtPrice, sku, categoryId, imageUrl, additionalImages, isFeatured, inventoryQuantity, weight, dimensions, tags)
        VALUES (${product.name}, ${product.description}, ${product.price}, ${product.compareAtPrice}, ${product.sku}, ${product.categoryId}, ${product.imageUrl}, ${JSON.stringify([])}, ${product.isFeatured}, ${product.inventoryQuantity}, ${product.weight}, ${JSON.stringify({})}, ${JSON.stringify(product.tags)})
        ON CONFLICT (sku) DO NOTHING
      `
    }

    console.log("Data seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding data:", error)
  }
}

// Run the seeding function
seedData()
