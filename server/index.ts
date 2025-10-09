import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Contact endpoint: placeholder. If SMTP or email service is configured via env vars,
  // this can be implemented to send emails (e.g., using nodemailer or an external API).
  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Check for SMTP config (not implemented in this starter). Return 501 to indicate not configured.
    const smtpConfigured = !!(
      process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.CONTACT_EMAIL
    );

    if (!smtpConfigured) {
      console.warn("Contact submission received but SMTP not configured.", { name, email });
      return res.status(501).json({ error: "SMTP not configured" });
    }

    // If SMTP were configured, implement sending logic here.
    return res.status(200).json({ message: "Email queued (not implemented)" });
  });

  return app;
}
