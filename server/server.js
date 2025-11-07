const express = require("express");
const path = require("path"); // For static file serving
const app = express();
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv");
dotenv.config();


const PORT = process.env.PORT || 8001;

// Connecting to MongoDB
console.log("MONGO_URI:", process.env.MONGO_URI);

const connectDB = require("./config/db");
connectDB();
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Allow all origins for CORS (testing phase)
app.use(cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies/auth headers if needed
}));

// Serve static files from the client/public folder
app.use(express.static(path.join(__dirname, "../client/public")));

// Routes of the app
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/form/", require("./routes/formRoutes"));
app.use("/api/resume", require("./routes/resumeRoutes"));

// Error Middleware
app.use(errorHandler);

// Test route
app.get("/", (req, res) => {
    res.status(200).send("Backend Server");
});

app.listen(PORT, () => {
    console.log(`SERVER IS LISTENING AT PORT ${PORT}!`);
});