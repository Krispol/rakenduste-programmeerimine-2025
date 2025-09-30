const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev-only-secret-change-me";
const JWT_ISSUER = process.env.JWT_ISSUER || "todo-backend";

exports.login = (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: "username and password are required" });
  }

  const role = username === "admin" ? "admin" : "user";

  const payload = { sub: username, role };

  const token = jwt.sign(payload, JWT_SECRET, {
    issuer: JWT_ISSUER, 
    expiresIn: "1h",
  });

  return res.json({ token });
};

exports.ping = (req, res) => {
  const auth = req.headers["authorization"] || "";
  const parts = auth.split(" ");
  const token = parts.length === 2 && parts[0] === "Bearer" ? parts[1] : null;

  if (!token) {
    return res.status(401).json({ error: "missing Bearer token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET, { issuer: JWT_ISSUER });
    return res.json({ ok: true, token: decoded });
  } catch (err) {
    return res.status(401).json({
      ok: false,
      error: "invalid token",
      details: err.message,
    });
  }
};
