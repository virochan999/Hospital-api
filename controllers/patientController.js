import Doctor from "../models/doctor.js"
import Patient from "../models/patient.js"
import Report from "../models/report.js"

/* Handle the new patient registeration  */
export const patientRegister = async (req, res) => {
  try {
    const { phoneNumber } = req.body

    const existingUser = await Patient.findOne({ phoneNumber: phoneNumber })
    // If user already exists then show the message user already exist
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" })
    }

    // Create a new patient with phone number
    const newPatient = new Patient({ phoneNumber: phoneNumber })
    await newPatient.save()

    return res.status(201).json({ message: "Patient registered successfully" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

/* Handle the creation of a report for the patient */
export const createReport = async (req, res) => {
  try {
    const { id: patientId } = req.params
    const status = req.body
    const { userId: doctorId } = req.user

    const patient = await Patient.findById(patientId)
    // If patient and doctor are not found then throw an error
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" })
    }

    const doctor = await Doctor.findById(doctorId)
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" })
    }

    // Create the new report with the following parameters
    const newReport = new Report({
      patient: patientId,
      created_by: doctorId,
      status: status.status,
      date: new Date(),
    })

    await newReport.save()

    return res
      .status(201)
      .json({ message: "Report created successfully", report: newReport })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

/* Handle the route to get all the reports for a patient */
export const allReports = async (req, res) => {
  try {
    const { id: patientId } = req.params
    const patient = await Patient.findById(patientId)

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" })
    }

    // Find all the reports for the patient sorted by date
    const reports = await Report.find({ patient: patientId }).sort({
      data: "asc",
    })

    return res.status(200).json({ reports: reports })
  } catch (error) {
    console.log(error)
    return res.status(404).json({ error: "Internal server error" })
  }
}
