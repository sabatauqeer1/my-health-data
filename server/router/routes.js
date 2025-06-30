import express from "express";
const router = express.Router();
import  {BloodPressureInput} from "../controller/bloodPressure.js"
//routes

router.post("/dailydata", BloodPressureInput);



export default router;