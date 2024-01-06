import Report from "../models/report.js"

/* To get the reports according to their status */
export const getReportsByStatus = async (req, res) => {
  try {
    const { status } = req.params

    // Allowed status
    const allowedStatusValues = [
      "Negative",
      "Travelled-Quarantine",
      "Symptoms-Quarantine",
      "Positive-Admit",
    ]
    // If the status is not allowed then return an error
    if (!allowedStatusValues.includes(status)) {
      return res.status(400).json({ error: "Invalid status" })
    }

    // Get the reports by their status
    const reports = await Report.find({ status })
    return res.status(200).json({ reports })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
