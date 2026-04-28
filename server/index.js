import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
// import { Router } from "express";
import userRoutes from './routes/userRoutes.js'
import listingRoutes from './routes/listingRoutes.js'
import { auth } from "express-oauth2-jwt-bearer"


const PORT = 3000
const app = express()
// const router = Router()

dotenv.config()

//middleware
app.use(cors())
app.use(express.json())

// configure auth middleware
export const checkJwt = auth({
    issuerBaseURL: "dev-ha77yk6xwh4lfapo.us.auth0.com",
    audience: "https://u-commerce.com/api",
    tokenSigningAlg: 'RS256',
})

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({
    error: err.code || 'unauthorized',
    message: status === 401 ? 'Authentication required' : message,
  });
});


// API routes
app.use('/api/users', checkJwt, userRoutes)
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