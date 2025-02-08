import mongoose from "mongoose"

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://ayush:AyushKiGangHai@cluster0.kutj9.mongodb.net/Delivery-system').then(()=>{
        console.log("DB Connected");
    })
}
