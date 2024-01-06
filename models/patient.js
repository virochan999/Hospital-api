import mongoose from "mongoose"

/* Patient schemna */
const patientSchema = {
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
  },
}

const Patient = mongoose.model("Patient", patientSchema)

export default Patient
