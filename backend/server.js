import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 5000;

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
console.log("Mounting routes...");
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
console.log("API routes mounted.");

// File uploads (same for dev & prod)
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Frontend static files (only in production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );

  console.log("Production static routes set.");
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });

  console.log("Dev routes set.");
}

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Debug: list registered routes
try {
  console.log("Listing all registered routes:");
  app._router.stack
    .filter((r) => r.route)
    .forEach((r) =>
      console.log(
        `[${Object.keys(r.route.methods).join(",").toUpperCase()}] ${
          r.route.path
        }`
      )
    );
} catch (err) {
  console.error("Route listing failed:", err.message);
}

// Start server
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
