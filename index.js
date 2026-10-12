import express from "express";
import helmet from "helmet";
import jwt from "jsonwebtoken";

import watchlistRoutes from "./routes/watchlist.js";
import { findByUsername } from "./utils/db.js";


const PORT = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Family Movie Watchlist API");
});

app.use("/api/watchlist", watchlistRoutes);

app.post("/api/auth/login", (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400);
  }

  const user = findByUsername(req.body.username);
  if (!user || user._password !== req.body.password) {
    return res.status(401);
  }
  const token = jwt.sign({id: user.id, name: user.name, username: user.username, role: user.role}, process.env.JWT_SECRET, { expiresIn: "1d" });
  return res.status(200).json({token})
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
