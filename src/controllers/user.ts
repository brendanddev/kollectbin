import { initDatabase } from "../db/init.js";

// Controller logic for the users of the project. Each handler receives an HTTP request, 
// validates the input, calls the model, and sends back the response.

const db = await initDatabase();
