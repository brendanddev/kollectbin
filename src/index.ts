import app from "./server.js";
import { PORT } from "./config/config.js";
import { initDatabase } from "./db.js";

const db = await initDatabase();
console.log(`Database connection created...`);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
