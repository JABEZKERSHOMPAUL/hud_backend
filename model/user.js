const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    firstname:{type:String,require:true},
    lastname:{type:String,require:true},
    password:{type:String,require:true},
    email:{type:String,require:true},
    age:{type:Number,require:true},
    gender:{type:String,require:true},
    mobile:{type:Number,require:true},
    pdf: { type: String, default: '' }

})

const credentials=mongoose.model("hudson",userSchema)

module.exports=credentials