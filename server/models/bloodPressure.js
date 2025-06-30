
import mongoose from "mongoose";
const BloodPressureSchema = new mongoose.Schema({
    Systolic: {
    type: Array,
    required: true,
  },
  Diastolic : {
    type: Array,
    required: true,
  }
},
{
  timestamps: { createdAt: true, updatedAt: false ,overoverwriteImmutable: true} 
});

BloodPressureSchema.pre("save", async function (next){
 const oldTimeStamp = this.createdAt
 const newTimeStamp = oldTimeStamp.toDateString()

 console.log(newTimeStamp);
 
next()


 
  
}
  )


export const BloodPressure = mongoose.model("BloodPressure", BloodPressureSchema);
