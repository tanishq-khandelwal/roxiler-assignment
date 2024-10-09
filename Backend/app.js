import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import initRoutes from "./Routes/seedData.routes.js"
import transactionRoutes from "./Routes/transaction.routes.js";
import statisticsRoutes from "./Routes/statistics.routes.js"; // Import your statistics routes
import barChartRoutes from "./Routes/barChart.routes.js"; // Import your bar chart routes
import pieChartRoutes from "./Routes/pieChart.routes.js"; // Import your pie chart routes
import combinedDataRoutes from "./Routes/combinedData.routes.js"; //

// Logging middleware
dotenv.config();

const app = express();

// Logging middleware
app.use(morgan("dev"));
app.set("trust proxy", 1);


app.use(
    cors({
      origin: ["http://localhost:5173","*","https://roxiler-assignment-fawn.vercel.app/"],
      credentials: true,
      httpOnly: false,
      optionSuccessStatus: 200,
      sameSite: "None",
      secure: true,
      methods: "GET, POST, PUT, DELETE", // Specify the allowed HTTP methods
      allowedHeaders: "Content-Type, Authorization",
      cookie: {
        secure: true,
        sameSite: "None",
      },
    })
  );


app.use(cookieParser());
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("Pong");
});

app.use("/api/v1/",initRoutes);
app.use("/api/v1", transactionRoutes); // Register transaction routes
app.use("/api/v1", statisticsRoutes); // Register statistics routes
app.use("/api/v1", barChartRoutes); // Register bar chart routes
app.use("/api/v1", pieChartRoutes); // Register pie chart routes
app.use("/api/v1", combinedDataRoutes); // Register combined data routes

app.all("*", (req, res) => {
  res.status(404).send("OOPS!! 404 Page Not Found");
});



export default app;
