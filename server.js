const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const { swaggerUi, swaggerDocs } = require('./swagger'); // Import swagger configuration

const app = express();
const port = 3000;
const moment = require('moment');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL password
  database: 'dental_app',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});


app.get('/patients', (req, res) => {
  db.query('SELECT * FROM patients', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Get a specific patient by ID
app.get('/patients/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM patients WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results[0]);
    }
  });
});

// Add a new patient
app.post('/patients', (req, res) => {
  const { patientId, photo, name, birthday, gender, contact, email, address } = req.body;
  const sql = 'INSERT INTO patients (patientId, photo, name, birthday, gender, contact, email, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [patientId, photo, name, birthday, gender, contact, email, address], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ id: result.insertId, patientId, photo, name, birthday, gender, contact, email, address });
    }
  });
});

// Update a patient
app.put('/patients/:id', (req, res) => {
  const { id } = req.params;
  const { patientId, photo, name, birthday, gender, contact, email, address } = req.body;
  const sql = 'UPDATE patients SET patientId = ?, photo = ?, name = ?, birthday = ?, gender = ?, contact = ?, email = ?, address = ? WHERE id = ?';
  db.query(sql, [patientId, photo, name, birthday, gender, contact, email, address, id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: 'Patient updated successfully.' });
    }
  });
});

// Delete a patient
app.delete('/patients/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM patients WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: 'Patient deleted successfully.' });
    }
  });
});

// ===== APPOINTMENTS ENDPOINTS =====

// Get all appointments
app.get('/appointments', (req, res) => {
  db.query('SELECT * FROM appointments', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Add a new appointment
app.post('/appointments', (req, res) => {
  const { patientId, date, time, doctor, status } = req.body;
  const sql = 'INSERT INTO appointments (patientId, date, time, doctor, status) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [patientId, date, time, doctor, status], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ id: result.insertId, patientId, date, time, doctor, status });
    }
  });
});

// Update an appointment
app.put('/appointments/:id', (req, res) => {
  const { id } = req.params;
  const { patientId, date, time, doctor, status } = req.body;
  const sql = 'UPDATE appointments SET patientId = ?, date = ?, time = ?, doctor = ?, status = ? WHERE id = ?';
  db.query(sql, [patientId, date, time, doctor, status, id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: 'Appointment updated successfully.' });
    }
  });
});

// Delete an appointment
app.delete('/appointments/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM appointments WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: 'Appointment deleted successfully.' });
    }
  });
});

// ===== PRESCRIPTIONS ENDPOINTS =====
// ===== PRESCRIPTIONS ENDPOINTS =====

// Get all prescriptions
app.get('/prescriptions', (req, res) => {
    db.query('SELECT * FROM prescriptions', (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  });
  
  // Add a new prescription
  app.post('/prescriptions', (req, res) => {
    const { patientId, date, medicine, notes } = req.body;
    const sql = 'INSERT INTO prescriptions (patientId, date, medicine, notes) VALUES (?, ?, ?, ?)';
    db.query(sql, [patientId, date, medicine, notes], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ id: result.insertId, patientId, date, medicine, notes });
      }
    });
  });
  
  // Update a prescription
  app.put('/prescriptions/:id', (req, res) => {
    const { id } = req.params;
    const { patientId, date, medicine, notes } = req.body;
    const sql = 'UPDATE prescriptions SET patientId = ?, date = ?, medicine = ?, notes = ? WHERE id = ?';
    db.query(sql, [patientId, date, medicine, notes, id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Prescription updated successfully.' });
      }
    });
  });
  
  // Delete a prescription
  app.delete('/prescriptions/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM prescriptions WHERE id = ?', [id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Prescription deleted successfully.' });
      }
    });
  });

  // ===== TREATMENTS ENDPOINTS =====

// Get all treatments
app.get('/treatments', (req, res) => {
    db.query('SELECT * FROM treatments', (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  });
  
  // Add a new treatment
  app.post('/treatments', (req, res) => {
    const { patientId, dateVisit, teethNos, treatment, description, fees, remarks } = req.body;
    const sql = 'INSERT INTO treatments (patientId, dateVisit, teethNos, treatment, description, fees, remarks) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [patientId, dateVisit, teethNos, treatment, description, fees, remarks], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ id: result.insertId, patientId, dateVisit, teethNos, treatment, description, fees, remarks });
      }
    });
  });
  
  // Update a treatment
  app.put('/treatments/:id', (req, res) => {
    const { id } = req.params;
    const { patientId, dateVisit, teethNos, treatment, description, fees, remarks } = req.body;
    const sql = 'UPDATE treatments SET patientId = ?, dateVisit = ?, teethNos = ?, treatment = ?, description = ?, fees = ?, remarks = ? WHERE id = ?';
    db.query(sql, [patientId, dateVisit, teethNos, treatment, description, fees, remarks, id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Treatment updated successfully.' });
      }
    });
  });
  
  // Delete a treatment
  app.delete('/treatments/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM treatments WHERE id = ?', [id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Treatment deleted successfully.' });
      }
    });
  });

  // ===== DENTAL HISTORIES ENDPOINTS =====

// Get all dental histories
app.get('/dental-histories', (req, res) => {
    db.query('SELECT * FROM dental_histories', (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  });
  
  // Add a new dental history
  app.post('/dental-histories', (req, res) => {
    const { patientId, previousDentist, lastDentalVisit, action } = req.body;
    const sql = 'INSERT INTO dental_histories (patientId, previousDentist, lastDentalVisit, action) VALUES (?, ?, ?, ?)';
    db.query(sql, [patientId, previousDentist, lastDentalVisit, action], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ id: result.insertId, patientId, previousDentist, lastDentalVisit, action });
      }
    });
  });
  
  // Update a dental history
  app.put('/dental-histories/:id', (req, res) => {
    const { id } = req.params;
    const { patientId, previousDentist, lastDentalVisit, action } = req.body;
    const sql = 'UPDATE dental_histories SET patientId = ?, previousDentist = ?, lastDentalVisit = ?, action = ? WHERE id = ?';
    db.query(sql, [patientId, previousDentist, lastDentalVisit, action, id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Dental history updated successfully.' });
      }
    });
  });
  
  // Delete a dental history
  app.delete('/dental-histories/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM dental_histories WHERE id = ?', [id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Dental history deleted successfully.' });
      }
    });
  });

  // ===== MEDICAL HISTORIES ENDPOINTS =====

// Get all medical histories
app.get('/medical-histories', (req, res) => {
    db.query('SELECT * FROM medical_histories', (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  });
  
  // Add a new medical history
  app.post('/medical-histories', (req, res) => {
    const { patientId, condition, symptoms, lastVisitDate, ongoingTreatment, medicationDetails, allergies, illnesses, action } = req.body;
    const sql = 'INSERT INTO medical_histories (patientId, condition, symptoms, lastVisitDate, ongoingTreatment, medicationDetails, allergies, illnesses, action) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [patientId, condition, symptoms, lastVisitDate, ongoingTreatment, medicationDetails, allergies, illnesses, action], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ id: result.insertId, patientId, condition, symptoms, lastVisitDate, ongoingTreatment, medicationDetails, allergies, illnesses, action });
      }
    });
  });
  
  // Update a medical history
  app.put('/medical-histories/:id', (req, res) => {
    const { id } = req.params;
    const { patientId, condition, symptoms, lastVisitDate, ongoingTreatment, medicationDetails, allergies, illnesses, action } = req.body;
    const sql = 'UPDATE medical_histories SET patientId = ?, condition = ?, symptoms = ?, lastVisitDate = ?, ongoingTreatment = ?, medicationDetails = ?, allergies = ?, illnesses = ?, action = ? WHERE id = ?';
    db.query(sql, [patientId, condition, symptoms, lastVisitDate, ongoingTreatment, medicationDetails, allergies, illnesses, action, id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Medical history updated successfully.' });
      }
    });
  });
  
  // Delete a medical history
  app.delete('/medical-histories/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM medical_histories WHERE id = ?', [id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Medical history deleted successfully.' });
      }
    });
  });

  // ===== SCHEDULES ENDPOINTS =====

// Get all schedules
app.get('/schedules', (req, res) => {
    db.query('SELECT * FROM schedules', (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  });
  
  // Add a new schedule
  app.post('/schedules', (req, res) => {
    const { date, dentistId, startTime, endTime, duration } = req.body;
  
    // Convert startTime and endTime to 24-hour format
    const formattedStartTime = moment(startTime, ['h:mm A']).format('HH:mm:ss');
    const formattedEndTime = moment(endTime, ['h:mm A']).format('HH:mm:ss');
  
    const sql = 'INSERT INTO schedules (date, dentistId, startTime, endTime, duration) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [date, dentistId, formattedStartTime, formattedEndTime, duration], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ id: result.insertId, date, dentistId, startTime: formattedStartTime, endTime: formattedEndTime, duration });
      }
    });
  });
  
  // Update a schedule
  app.put('/schedules/:id', (req, res) => {
    const { id } = req.params;
    const { date, dentistId, startTime, endTime, duration } = req.body;
    const sql = 'UPDATE schedules SET date = ?, dentistId = ?, startTime = ?, endTime = ?, duration = ? WHERE id = ?';
    db.query(sql, [date, dentistId, startTime, endTime, duration, id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Schedule updated successfully.' });
      }
    });
  });
  
  // Delete a schedule
  app.delete('/schedules/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM schedules WHERE id = ?', [id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Schedule deleted successfully.' });
      }
    });
  });
// Add all similar endpoints for `prescriptions`, `treatments`, `dental histories`, `medical histories`, and `schedules`.

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Set up Swagger UI

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});