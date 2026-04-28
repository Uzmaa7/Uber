import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
})
import app from "../Backend/app.js";
import http from "http";
import connectDB from "./db/db.js";




const server = http.createServer(app);
const port = process.env.PORT || 3000;


connectDB()
.then(() => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch((error) => {
    console.error("Mongodb connection error", error);
})
