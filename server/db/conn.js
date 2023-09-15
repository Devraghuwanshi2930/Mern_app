const mongoose = require("mongoose");

const DB = "mongodb+srv://devraghuwanshi38:devraghu123@cluster0.gfk0w4y.mongodb.net/mernstack?retryWrites=true&w=majority"

mongoose.connect(DB,{
    
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("Database connected")).catch((errr)=>{
    console.log(errr);
});