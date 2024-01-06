import express from "express"
import { doctorLogin, doctorRegister } from "../controllers/doctorController.js"

const doctorRouter = express.Router()

// Handle the register of a new doctor
doctorRouter.post("/register", doctorRegister)

// Handle the login of a doctor
doctorRouter.post("/login", doctorLogin)

export default doctorRouter
