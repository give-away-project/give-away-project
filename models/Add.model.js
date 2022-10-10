const { Schema, model } = require("mongoose");

const addSchema = new Schema(
    { 
       title: {
        type: String,
        required: true, 
        minlength: 5,
        maxlength: 100,
       },

       description: {
        type: String,
        required: true, 
        minlength: 10,
        maxlength: 300
       },

       imageUrl: {
        type: String,
        required: false
       },

       isReserved: {
        required: false,
       }, 

       category: {
            enum: ['art', 'cinema', 'litterature', 'music'],
            required: true
       },

       condition: {
            enum: ['new', 'very good', 'good', 'so so', 'to repair'], 
            required: true
       }, 

       location: {
        city: String,
        address: {
            streetName: String,
            postalCode: String
        }
       }, 

       type: {
            enum: ['offer', 'request'], 
            required: true
       }
    }
    )

    module.exports = model('Add', addSchema);