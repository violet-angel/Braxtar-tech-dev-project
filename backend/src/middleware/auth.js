function requireRole(...roles) {
  return (req, res, next) => {
    const role = req.header("x-demo-role");
    if (!role || !roles.includes(role)) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = { id: role === "admin" ? "u-admin" : "u-buyer-demo", role };
    next();
  };
}

module.exports = { requireRole };
