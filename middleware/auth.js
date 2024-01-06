import jwt from "jsonwebtoken"

/* Middleware to verify JWT authentication for secure data operations */
const authenticateDoctor = (req, res, next) => {
  const token = req.headers["authorization"]
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" })
  }
  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    )
    req.user = decoded
    next()
  } catch (err) {
    console.error(err)
    return res.status(401).json({ error: "Unauthorized: Invalid token" })
  }
}

export default authenticateDoctor
