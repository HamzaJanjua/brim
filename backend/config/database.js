import mysql from "mysql2";

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host:process.env.HOST,
  user:process.env.DBUSER,
  password:process.env.DBPASS,
  database:process.env.DBNAME,
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
