import { BloodPressure } from "../models/bloodPressure.js";

export const getMonthlyInput = async (req, res) => {
  try {
    const getMonthlyInput = await BloodPressure.find({});
    console.log(getMonthlyInput);

    res.json(getMonthlyInput);
  } catch (error) {
    res.json({ msg: error.msg });
  }
};
