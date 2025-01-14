const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { swaggerUi, swaggerDocs } = require('./swagger'); // Import swagger configuration
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 8082;

// Import routes
const patientsRoutes = require('./routes/patients');
const appointmentsRoutes = require('./routes/appointments');
const dentalHistoriesRoutes = require('./routes/dental_histories');
const medicalHistoriesRoutes = require('./routes/medical_histories');
const schedulesRoutes = require('./routes/schedules');
const treatmentsRoutes = require('./routes/treatments');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const serviceListRoutes = require('./routes/serviceslist');
const dentistRoutes = require('./routes/dentist');
const healthDeclarationsRoutes = require('./routes/health_declarations');
const prescriptionsRoutes = require('./routes/prescriptions');
const timeslotsRoutes = require('./routes/timeslots');
const staffRoutes = require('./routes/staff');

// Middleware
app.use(cors({
  origin: 'http://localhost:8082',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Route mounting
app.use('/patients', patientsRoutes);
app.use('/appointments', appointmentsRoutes);
app.use('/treatments', treatmentsRoutes);
app.use('/dental_histories', dentalHistoriesRoutes);
app.use('/medical_histories', medicalHistoriesRoutes);
app.use('/schedules', schedulesRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/serviceslist', serviceListRoutes);
app.use('/dentist', dentistRoutes);
app.use('/health_declarations', healthDeclarationsRoutes);
app.use('/prescriptions', prescriptionsRoutes);
app.use('/timeslots', timeslotsRoutes);
app.use('/staff', staffRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
