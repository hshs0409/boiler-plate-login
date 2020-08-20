import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.get("/", (req, res) => res.send("Hello"));

app.listen(PORT, () => console.log(`Server Connect Success in ${PORT} `));
