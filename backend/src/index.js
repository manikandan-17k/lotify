import express from 'express';
import dotenv from 'dotenv';
import fileupload from 'express-fileupload';
import path from 'path';
import {clerkMiddleware } from '@clerk/express'
import userRoutes from './route/user.route.js';
import authRoutes from './route/auth.route.js';
import adminRoutes from './route/admin.route.js';
import songRoutes from './route/songs.route.js';
import albumRoutes from './route/albums.route.js';
import statsRoutes from './route/stat.route.js';
import { testDB } from "./lib/db.js";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
const __dirname = path.resolve();
// Apply `clerkMiddleware()` to all routes
app.use(clerkMiddleware())
app.use(express.json());
app.use(fileupload({
    useTempFiles:true,
    tempFileDir: path.join(__dirname,"tmp"),
    createParentPath:true,
    limits:{fileSize: 10 * 1024 * 1024} // 10MB
}));
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/songs",songRoutes);
app.use("/api/albums",albumRoutes);
app.use("/api/stats",statsRoutes);

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(500).json({error:err.message || "Internal Server Error"});
});


app.listen(PORT,()=>{
    console.log("Server is running on port",PORT);  
    testDB();

})