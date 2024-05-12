const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');


const connectToMongoDB = require('./connect');
const {restrictToLoggedInUserOnly, checkAuth} = require('./middlewares/auth');

const URL = require('./models/url');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT = 8002;

const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from your React frontend
    credentials: true, // Allow credentials to be included
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  };

//MongoDB connection
connectToMongoDB('mongodb://localhost:27017/short-url-fullstack')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/url",restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);


app.get('/url/:shortId', async (req, res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
        shortId
    }, {$push: {
        visitHistory: {
            timestamp: Date.now(),
        },
    },});
    console.log(entry);
    console.log(entry.redirectURL);
    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => 
    console.log(`Server is running on port: ${PORT}`)
);

