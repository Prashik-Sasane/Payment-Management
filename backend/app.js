const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.routes')
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())
app.use(bodyParser.json());

app.use('/user' , userRouter)

app.listen(PORT , () => {
    console.log(`server is running on the port ${PORT}`);
})