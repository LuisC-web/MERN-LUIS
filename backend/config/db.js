import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const uri=process.env.Mongo_URI



const conectarBD= async ()=>{
console.log(uri)
  try{

    const connection= await mongoose.connect(
uri,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
}

    );
const url=`${connection.connection.host}:${connection.connection.port}`
console.log(`MongoDB se esta conectando a ${url}`)
}catch(error){
  console.log(`error: ${error.message}`)
  process.exit(1)
}
}

export default conectarBD;
