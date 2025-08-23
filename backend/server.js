import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import listEndpoints from "express-list-endpoints"; // ✅ added

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const port = process.env.PORT || 5000;

// Connect DB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

console.log(" Mounting routes...");
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // Express 5 compatible catch-all
  app.get("{*splat}", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
  console.log(" Production static routes set");
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
  console.log(" Dev routes and static folder set");
}

app.use(notFound);
app.use(errorHandler);

// ✅ Safely list all registered routes
console.log(" Listing all registered routes:");
//console.table(listEndpoints(app));

app.listen(port, () =>
  console.log(` Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
