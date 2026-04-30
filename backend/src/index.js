import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './route/user.route.js';
import authRoutes from './route/auth.route.js';
import adminRoutes from './route/admin.route.js';
import songRoutes from './route/songs.route.js';
import albumRoutes from './route/albums.route.js';
import statsRoutes from './route/stats.route.js';
import { testDB } from "./lib/db.js";
dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/songs",songRoutes);
app.use("/api/albums",albumRoutes);
app.use("/api/stats",statsRoutes);




app.listen(3000,()=>{
    console.log("Server is running on port",PORT);  
    testDB();

})