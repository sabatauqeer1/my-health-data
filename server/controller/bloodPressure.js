import { BloodPressure } from "../models/bloodPressure.js"
  export const BloodPressureInput= async(req, res)=>{
    try {
      const {systolic,diastolic} =req.body 
      console.log("systolic :" ,systolic, "diastolic :",diastolic );
      

     const DailyBloodPressureInput = await BloodPressure.create({
         Systolic:systolic,
         Diastolic:diastolic,
       
      
     }
    )
     await DailyBloodPressureInput.save()

     
   res.send(DailyBloodPressureInput,"result")
     } catch (error) {
      console.log(error.message);
      
      
    }
   

    
}