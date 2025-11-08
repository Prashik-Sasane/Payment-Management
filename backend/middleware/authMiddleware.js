const { verifyToken } = require("../services/auth");

function authMiddleware(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
      const payload = verifyToken(token);
      req.user = { ...payload, password: undefined };
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ error: "Invalid token" });
    }

    next();
  };
}

module.exports = { authMiddleware };
