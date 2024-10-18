const mongoose = require("mongoose")

const course = new mongoose.Schema({


    title: {
        type: String,
        require: true
    },

    description:
    {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },

    thumbnail :{
        public_id :{
            type :String,
            require : true,

        },
        secure_url :{
            type : String,
            require : true
        }
    },
    lectures :[{
        title : String,
        description : String,
        lecture :{
            public_id :{
                type :String

            },
            secure_url :{
                type : String
            }
        }
    }],
    numbersOfLectures :{
        type :Number,
        default: 0,
    },
    createdBy :{
        type:String
    }


})

const Card = new mongoose.model("Card", course)

module.exports = Card 