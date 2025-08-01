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

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

console.log(" Mounting routes...");
app.use("/api/products", productRoutes);
console.log(" Mounted /api/products");

app.use("/api/users", userRoutes);
console.log(" Mounted /api/users");

app.use("/api/orders", orderRoutes);
console.log(" Mounted /api/orders");

app.use("/api/upload", uploadRoutes);
console.log(" Mounted /api/upload");

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
console.log(" Mounted /api/config/paypal");

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
  console.log("Production static routes set");
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
  console.log(" Dev routes and static folder set");
}

console.log(" Setting notFound middleware");
app.use(notFound);

console.log(" Setting errorHandler middleware");
app.use(errorHandler);

//  DEBUG: List all registered routes (safely)
try {
  console.log(" Listing all registered routes:");
  app._router.stack
    .filter((r) => r.route)
    .forEach((r) =>
      console.log(
        ` [${Object.keys(r.route.methods).join(",").toUpperCase()}] ${
          r.route.path
        }`
      )
    );
} catch (err) {
  console.error(" Route listing failed:", err.message);
}

app.listen(port, () =>
  console.log(` Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
