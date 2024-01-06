import Express from "express"
import doctorRouter from "./routes/doctorRoutes.js"
import patientsRouter from "./routes/patientRoutes.js"
import reportsRouter from "./routes/reportsRouter.js"
import connectDB from "./Database/db.js"
import bodyParser from "body-parser"

const app = Express()

app.use(bodyParser.urlencoded({ extended: false }))

const PORT = process.env.PORT || 3000

app.use(Express.json())

// Handle all the routes for the application
app.use("/doctor", doctorRouter)
app.use("/patient", patientsRouter)
app.use("/reports", reportsRouter)

// connect to the server after connecting to the database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}!`)
  })
})
