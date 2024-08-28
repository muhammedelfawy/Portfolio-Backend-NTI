import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { swaggerUi, swaggerSpec } from '../swagger';

dotenv.config();
const app = express();


// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



// call routes
import dbConnection from './config/DBconnection';
import projectsRoute from './routes/projectsRoute';
import servicesRoute from './routes/servicesRoute';
import contactRoute from './routes/contactRoute';
import homeRoute from './routes/homeRoute';




// start request pipeline
app.use('/api/v1/projects', projectsRoute);
app.use('/api/v1/services', servicesRoute);
app.use('/api/v1/contacts', contactRoute);
app.use('/', homeRoute);
app.get("/hello",(req, res) => {
  res.status(200).send('Hello World');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get("/secret-path-API",(req, res) => {
  const {password} = req.body;
  if (password !== process.env.API_PASSWORD) {
    return res.status(401).send('You are not authorized to access this route');
  }
  const token = process.env.API_KEY;
  return res.cookie("auth", token, { httpOnly: true, secure: true }).send('Generated token successfully');
});
app.use((err,req,res,next)=>{
    res.status(500).json({
        status:'error',
        message:err.message
    })
})
app.all('*',(req,res)=>{
    res.status(404).json({
        status:'fail',
        message:'Page not found'
    })
})


// start server
const PORT: string | number = process.env.PORT || 8000;
const server=app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  dbConnection();
})

// Handle rejection outside express
process.on('unhandledRejection', (err:any) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
      console.error(`Shutting down....`);
      process.exit(1);
  });
});