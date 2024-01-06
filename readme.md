# Hospital API for COVID-19 Testing and Quarantine

This API is designed to facilitate the management of COVID-19 testing, quarantine, and patient well-being for a hospital. It provides endpoints for doctor and patient registration, creating patient reports, and fetching reports based on various criteria.

## Tech Stack

- Node.js
- MongoDB
- Express.js

## Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/hospital-api.git
   cd hospital-api
   ```

2. **Install Dependencies:**

```
npm install
```

3. **Set Environment Variables:**

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/hospital-api
JWT_SECRET=your-secret-key-here
```

4. **Run the Application:**

```
npm start
```

## API Endpoints

### Doctors

1. POST /doctors/register: Register a new doctor.
2. POST /doctors/login: Log in and receive a JWT.

### Patients

1. POST /patients/register: Register a new patient.
2. POST /patients/:id/create_report: Create a new patient report.
3. GET /patients/:id/all_reports: List all reports of a patient (oldest to latest).

### Reports

1. GET /reports/:status: List all reports across all patients filtered by a specific status.

### Authentication

Protected routes require a valid JWT. Include the JWT in the Authorization header of your requests.

### Folder Structure

The project follows a scalable folder structure:

**controllers:** Logic for handling requests.
**middleware:** Authentication middleware.
**models:** MongoDB schemas.
**routes:** Express route handlers.
**Database:** MongoDB connection setup.
