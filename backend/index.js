import express from "express";
import { connectDB } from "./config/db.js";
import router from "./routes/index.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve()

app.use(express.json());
app.use(router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

console.log(process.env.NODE_ENV);
app.listen(PORT, () => {
  connectDB();
  console.log(`Server listen on http://localhost:${PORT}`);
});
