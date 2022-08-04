import express from 'express'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import './auth/passport'
import { userRouter } from './routers/user.router'
const cors = require("cors");


const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Expose-Headers", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      " Accept,Accept-Language,Content-Language,Content-Type,Authorization,Set-Cookie,X-Requested-With,Origin,Host"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
  

var corsOptions = {
    origin: "http://localhost:4200",
    // credentials: true,
};

app.use(cors(corsOptions));

app.use(userRouter)


const port = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.json({
        message: "Node JWT Cookie Service"
    })
})

app.listen(port, () => {
    console.log(`Server is up at port:${port}`)
})