import mongoose from "mongoose"
import bcrypt from "bcrypt"

const doctorSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

doctorSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const Doctor = mongoose.model("Doctor", doctorSchema)

export default Doctor
