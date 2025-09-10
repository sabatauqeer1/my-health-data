import express from "express";
const router = express.Router();
import { dailyBp } from "../controller/dailyInput.js";
import { getMonthlyInput } from "../controller/monthlyData.js";
import { deleteSheet } from "../controller/deleteForm.js";
import { deleteOne } from "../controller/deleteOne.js";

//routes

router.get("/monthlydata", getMonthlyInput);
router.post("/dailydata", dailyBp);
router.delete("/deletesheet", deleteSheet);
router.delete("/deleteone", deleteOne);

export default router;
