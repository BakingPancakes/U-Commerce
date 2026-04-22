import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
// import { Router } from "express";
import userRoutes from './routes/userRoutes.js'
import listingRoutes from './routes/listingRoutes.js'


const PORT = 3000
const app = express()
// const router = Router()

dotenv.config()

//middleware
app.use(cors())
app.use(express.json())

// API routes
app.use('/api/users', userRoutes)
app.use('/api/listings', listingRoutes)

/*
//test the router
router.get('/connection-test', (req, res) => {
    res.json({
        status: 'ok',
        backend: 'running',
        timestamp: new Date().toISOString()
    });
});

*/

//test the backend
app.get('/test', (req, res) => {
    res.send("Server is running");
})

//run on given port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});