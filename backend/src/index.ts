import "dotenv/config";
import express from "express";
import cors from "cors";
import verificationRoutes from "./routes/verification.js";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/", verificationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`[backend] listening on http://localhost:${PORT}`);
});


