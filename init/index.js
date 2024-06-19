const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");



const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then((res)=>{console.log("mongo db ok")})
.catch((err)=>{console.log(err)});

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDb = async () =>{

   await Listing.deleteMany({});
   initData.data = initData.data.map((obj)=>({...obj,owner:"6668798caaf60ec9be2b4549"}));
   await Listing.insertMany(initData.data);
   console.log("data was initlize");

}

initDb();
