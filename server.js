const express = require('express');
const bcrypt = require('bcryptjs')
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./Config/Db');
const authroutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

//dotenv
dotenv.config();
//mongo connection 
connectDB();
//rest object
const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(errorHandler)

const PORT = process.env.PORT || 8080;
//API routes
app.use("/api/v1/auth",authroutes);
app.use('/api/v1/openai',require('./routes/openaiRoutes'))
//listen server
app.listen(PORT,()=>{
    console.log(`server is running in ${process.env.DEV_MODE} On ${PORT}`.bgBlue);
})