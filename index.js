const express = require('express');
const cors = require('cors');
const { connection } = require('./Configs/db');
const { userRouter } = require('./Routers/userRouter');
const { validator } = require('./Middlewares/authenticationMiddleware');
const { productRouter } = require('./Routers/productRouter');

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());

app.use("/users",userRouter)
app.use(validator)
app.use("/products",productRouter)





app.listen(process.env.port,async()=>{
    try {
        connection
        console.log(`Connected to Database`);
        console.log(`Connecting to ${process.env.port}`);
    } catch (error) {
        console.log(`Error in listening: ${error}`);
    }
})




