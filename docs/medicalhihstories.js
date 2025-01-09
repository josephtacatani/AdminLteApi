/**
 * @swagger
 * components:
 *   schemas:
 *     MedicalHistory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the medical history
 *         patientId:
 *           type: integer
 *           description: Corresponding patient's ID
 *         condition:
 *           type: string
 *           description: Medical condition being treated
 *         symptoms:
 *           type: string
 *           description: Symptoms reported by the patient
 *         lastVisitDate:
 *           type: string
 *           format: date
 *           description: Date of the last medical visit
 *         ongoingTreatment:
 *           type: boolean
 *           description: Whether the treatment is ongoing
 *         medicationDetails:
 *           type: string
 *           description: Details about medication
 *         allergies:
 *           type: string
 *           description: Known allergies
 *         illnesses:
 *           type: string
 *           description: Past or present illnesses
 *         action:
 *           type: string
 *           description: Action performed on the record
 *       required:
 *         - patientId
 *         - allergies
 *         - illnesses
 */