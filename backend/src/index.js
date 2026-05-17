import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import songRoutes from './routes/song.route.js';
import authRoutes from './routes/auth.route.js';
import statsRoutes from './routes/stats.route.js';
import albumRoutes from './routes/album.route.js';
import connectDB from './lib/db.js';
import {clerkMiddleware} from "@clerk/express";
import fileUpload from 'express-fileupload';
import path from 'path';


dotenv.config();
const __dirname = path.resolve();
const app = express();
app.use(clerkMiddleware());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'temp'),
  createParentPath: true,
  limits: { fileSize: 10 * 1024 * 1024 }, // 50MB 
}));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/albums ", albumRoutes);
const PORT = process.env.PORT;
connectDB();  
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: process.env.NODE_ENV === 'production' ? err.message : "An unexpected error occurred" });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});