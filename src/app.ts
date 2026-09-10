import express from 'express';
import comicRoutes from './routes/comic.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();
app.use(express.json());

app.use('/api/comics', comicRoutes);
app.use(errorHandler);

export default app;
