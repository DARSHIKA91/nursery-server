import express from "express";
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";

import { getHealth } from "./controllers/health.js";
import { postPlant, getPlants, getPlantId, putPlantId, deletePlantId } from "./controllers/plant.js";
import {handlePageNotFound} from "./controllers/errors.js"

const app = express()
app.use(express.json())

const dbConnection = async ()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URL)

    if(conn){
        console.log("Mongodb connected")
    }
    else{
        console.log("Mongodb not connected")
    }
}
 dbConnection();

app.get("/health", getHealth)

app.post("/plant", postPlant)
app.get("/plants", getPlants)
app.get("/plant/:id", getPlantId)
app.put("/plant/:id", putPlantId)
app.delete("/plant/:id",deletePlantId)

app.use("*", handlePageNotFound)

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})