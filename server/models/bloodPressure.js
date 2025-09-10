import mongoose from "mongoose";
const BloodPressureSchema = new mongoose.Schema(
  {
    Systolic: {
      type: Number,
      required: true,
    },
    Diastolic: {
      type: Number,
      required: true,
    },
    HeartBeat: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const BloodPressure = mongoose.model(
  "BloodPressure",
  BloodPressureSchema
);
