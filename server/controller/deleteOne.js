import { BloodPressure } from "../models/bloodPressure.js";

export const deleteOne = async (req, res) => {
  const id = req.body.id;
  console.log(id, "idd");

  try {
    await BloodPressure.findByIdAndDelete({ _id: id });
    console.log("deleted");

    res.send("deleted sheet");
  } catch (error) {
    console.log(error.message);
  }
};
