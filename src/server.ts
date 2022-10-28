import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { signup, login } from "./handlers/user";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "hello" });
});
app.post("/signup", signup);
app.post("/login", login);
app.use("/api", protect, router);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid inputs" });
  } else {
    res.status(500).json({ message: "thats on us" });
  }
});

export default app;
