import mysql from "mysql2";

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mern_2025",
});

// Connect to the database
db.connect((error) => {
  if (error) {
    console.error("❌ Error connecting to the database:", error.message);
    return;
  }
  console.log("✅ Connected to the MySQL database.");
});

export default db;
