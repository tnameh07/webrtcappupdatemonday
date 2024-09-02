import mongoose from "mongoose";


//  const dbConfig =  mongoose.connect(process.env.URL)
const dbConfig = ()=>{
    return mongoose.connect(process.env.URL);
}

 export default dbConfig;