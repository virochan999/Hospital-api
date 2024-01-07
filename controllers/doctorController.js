import Doctor from "../models/doctor.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

/* To handle the registeration of a new doctor */
export const doctorRegister = async (req, res) => {
  try {
    const { username, password } = req.body
    const existingUser = await Doctor.findOne({ username: username })
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" })
    }

    // Encrypt the password with hashing algorithm
    const hashedPassword = await bcrypt.hash(password, 10)
    const newDoctor = new Doctor({
      username: username,
      password: hashedPassword,
    })

    await newDoctor.save()

    return res.status(201).json({ message: "Doctor registered successfully" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

/* to handle the login of a exister doctor */
export const doctorLogin = async (req, res) => {
  try {
    const { username, password } = req.body
    const doctor = await Doctor.findOne({ username })

    if (!doctor || !(await doctor.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Generate the jwt token for the doctor login for secure authentication
    const token = jwt.sign(
      { userId: doctor._id, username: doctor.username },
      `${process.env.JWT_SECRET}`,
      { expiresIn: 3600 }
    )

    res.json({ token })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
