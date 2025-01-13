const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { swaggerUi, swaggerDocs } = require('./swagger'); // Import swagger configuration
const app = express();
const port = 8082;


const patientsRoutes = require('./routes/patients');
const appointmentsRoutes = require('./routes/appointments');
const dentalHistoriesRoutes = require('./routes/dental-histories');
const medicalHistoriesRoutes = require('./routes/medical-histories');
const schedulesRoutes = require('./routes/schedules');
const treatmentsRoutes = require('./routes/treatments'); // Ensure the path is correct



app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Set up Swagger UI

// Use routes
app.use('/patients', patientsRoutes);
app.use('/appointments', appointmentsRoutes);
app.use('/treatments', treatmentsRoutes);
app.use('/dental-histories', dentalHistoriesRoutes);
app.use('/medical-histories', medicalHistoriesRoutes);
app.use('/schedules', schedulesRoutes);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});