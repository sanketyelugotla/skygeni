const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const { data } = require("./routes/index.js")

const app = express();

// Cors to prevent access from other domains
const corsOptions = {
    origin: ['https://skygeni-ten.vercel.app', 'http://localhost:5173'],
    methods: 'GET',
};

// Middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB
// connectDB();

// Test route
app.get("/", (req, res) => {
    res.send("Skygeni api running...");
});

//  Main data route
app.use("/data", data);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
