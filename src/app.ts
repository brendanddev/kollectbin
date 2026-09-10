import express from 'express';
import comicRoutes from './routes/comicRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());

app.use('/api/comics', comicRoutes);
app.use(errorHandler);

export default app;
