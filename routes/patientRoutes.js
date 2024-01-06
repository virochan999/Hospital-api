import express from "express"
import {
  allReports,
  createReport,
  patientRegister,
} from "../controllers/patientController.js"
import authenticateDoctor from "../middleware/auth.js"

const patientsRouter = express.Router()

// Prevent all the patient routes with JWT authentication
patientsRouter.use(authenticateDoctor)

// Handle new patient registration
patientsRouter.post("/register", patientRegister)

// Handle patient report creation
patientsRouter.post("/:id/create_report", createReport)

// Get all the reports for a patient
patientsRouter.get("/:id/all_reports", allReports)

export default patientsRouter
