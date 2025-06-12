const sql = require("mssql")
const fs = require("fs")
const path = require("path")

async function setupDatabase() {
  const config = {
    server: process.env.AZURE_SQL_SERVER,
    database: process.env.AZURE_SQL_DATABASE,
    user: process.env.AZURE_SQL_USERNAME,
    password: process.env.AZURE_SQL_PASSWORD,
    port: Number.parseInt(process.env.AZURE_SQL_PORT || "1433"),
    options: {
      encrypt: process.env.AZURE_SQL_ENCRYPT === "true",
      trustServerCertificate: process.env.AZURE_SQL_TRUST_SERVER_CERTIFICATE === "true",
      enableArithAbort: true,
    },
  }

  try {
    console.log("Connecting to Azure SQL Database...")
    const pool = await sql.connect(config)

    console.log("Reading schema file...")
    const schemaPath = path.join(__dirname, "..", "database", "schema.sql")
    const schema = fs.readFileSync(schemaPath, "utf8")

    console.log("Executing schema...")
    const statements = schema.split("GO").filter((stmt) => stmt.trim())

    for (const statement of statements) {
      if (statement.trim()) {
        await pool.request().query(statement)
      }
    }

    console.log("Database setup completed successfully!")
    await pool.close()
  } catch (error) {
    console.error("Database setup failed:", error)
    process.exit(1)
  }
}

setupDatabase()
