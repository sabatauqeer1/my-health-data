import { BloodPressure } from "../models/bloodPressure.js";

export const dailyBp = async (req, res) => {
  try {
    const { systolic, diastolic, heartbeat } = req.body;
    console.log(req.body);

    console.log("systolic :", systolic, "diastolic :", diastolic);

    const DailyBloodPressureInput = await BloodPressure.create({
      Systolic: systolic,
      Diastolic: diastolic,
      HeartBeat: heartbeat,
    });
    await DailyBloodPressureInput.save();

    res.json(DailyBloodPressureInput, "result");
  } catch (error) {
    console.log(error.message);
  }
};
