import express from "express"
import { getReportsByStatus } from "../controllers/reportController.js"

const reportsRouter = express.Router()

// Route to handle the get all reports based on status
reportsRouter.get("/:status", getReportsByStatus)

export default reportsRouter
