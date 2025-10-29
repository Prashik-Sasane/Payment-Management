const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Import routes
const authRoutes = require("./routes/authRoutes");
const employeeRoutes= require("./routes/bankRoutes");
const employeesDataRoutes = require("./routes/employeeDataRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employee" , employeeRoutes);
app.use("/api/employeedata" , employeesDataRoutes);

// Optional (stubs may not exist yet)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
