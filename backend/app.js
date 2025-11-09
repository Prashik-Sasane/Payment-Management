const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/bankRoutes");
const employeesDataRoutes = require("./routes/employeeDataRoutes");
const hrRoutes = require("./routes/hrRoutes");
const payrollRoutes = require("./routes/payrunRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/hr" , hrRoutes)
app.use("/api/employeedata", employeesDataRoutes);
app.use("/api/payroll", payrollRoutes);

app.get("/", (_, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
