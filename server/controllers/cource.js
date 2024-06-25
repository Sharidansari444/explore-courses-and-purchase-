const courceModule = require("../models/cource-module")

const cource = async (req,res)=>{
    try {
        // find all data from mongodb 
        const response = await courceModule.find()
        res.status(200).json({message : response})
    } catch (error) {
        console.log(`cources error ${error}`)
    }
}

module.exports = cource