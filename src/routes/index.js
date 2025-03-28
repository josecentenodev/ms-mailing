/**
 * MS-Mailing - Archivo principal de rutas
 */
const express = require('express');
const emailRoutes = require('./email.routes');

const router = express.Router();

// Rutas de email
router.use('/email', emailRoutes);

module.exports = router; 