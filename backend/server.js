import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

import path from 'path'

import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url, '..');
let __dirname = path.dirname(__filename, '..');
__dirname = path.join(__dirname, '..')
console.log('directory-name 👉️', __dirname);
import connectDB from './config/db.js'

import productRoutes from './routes/productRoute.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'




import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  /*  app.get("/status", (req, res) => {
     res.send("API is running..");
   }); */
} else {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("/status", (req, res) => {
    res.send("API is running..");
  });
}

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} node on port  ${port}`.yellow
      .bold
  )
)
