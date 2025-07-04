
// app.js
// Creates and configures the express app
// Brendan Dileo, June 2025

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const comicRoutes = require('./routes/comicRoutes');
const shopRoutes = require('./routes/shopRoutes');
const userRoutes = require('./routes/userRoutes');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./docs/swagger.yml');

// Creates the app
const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.get('/', (req, res) => res.send('Server up and running...'));
app.use('/comics', comicRoutes);
app.use('/shops', shopRoutes);
app.use('/users', userRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = app;