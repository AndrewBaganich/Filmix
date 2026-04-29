import express from "express";
import movieRouter from "./routes.js/movie.routes.js";
import actorsRouter from "./routes.js/actor.routes.js";
import { requestTime, logger } from "./middlewares/middleware.js";
import cors from "cors";

const app = express();
const allowedOrigin = [
  "http://localhost:5173",
  "https://filmix-phi.vercel.app"
];

app.use(express.json());
app.use(express.static("public(OLD)"));
app.use("/uploads", express.static("uploads"));

app.use(requestTime);
app.use(logger);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigin.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/movies", movieRouter);
app.use("/api/actors", actorsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "NOT FOUND" });
});

export default app;
