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
const dentalHistoriesRoutes = require('./routes/dental-histories');
const medicalHistoriesRoutes = require('./routes/medical-histories');
const schedulesRoutes = require('./routes/schedules');
const treatmentsRoutes = require('./routes/treatments');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const serviceListRoutes = require('./routes/serviceslist');
const dentistRoutes = require('./routes/dentist');

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
app.use('/dental-histories', dentalHistoriesRoutes);
app.use('/medical-histories', medicalHistoriesRoutes);
app.use('/schedules', schedulesRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/serviceslist', serviceListRoutes);
app.use('/dentist', dentistRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
