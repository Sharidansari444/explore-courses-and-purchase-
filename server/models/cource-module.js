const mongoose = require("mongoose")

const  cource =  new mongoose.Schema({
  

description :{type:String,require:true},
price    :{type:String,require:true},
provider :{type:String,require:true},
service :{type:String,require:true}
     
})

const Card = new mongoose.model("Card", cource)

module.exports = Card