import express, { type Application, type Request, type Response } from "express";
import { PORT } from "./config.js";

const app: Application = express();
app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello, from Kollectbin!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
