import { BloodPressure } from "../models/bloodPressure.js";

export const deleteSheet = async (req, res) => {
  try {
    await BloodPressure.deleteMany({});
    console.log("h");

    res.send("deleted sheet");
  } catch (error) {
    console.log(error.message);
  }
};
