const { Schema, model } = require("mongoose");

const addSchema = new Schema(
    { 
       title: {
        type: String,
        required: true, 
       },

       description: {
        type: String,
        required: true,      
       },

       imageUrl: {
        type: String,
       },

       isReserved: {
        type: Boolean,
       }, 

       category: {
            enum: ['art', 'cinema', 'litterature', 'music'],
            required: true
       },

       condition: {
            enum: ['new', 'very good', 'good', 'so so', 'to repair'], 
            required: true
       }, 

       contactEmail: { 
            type: String, 
            required: true
       }, 

       town: { 
        type: String
       },

       typeOfAdd: {
            type: String,
            enum: ['offer', 'request'], 
            required: true
       }
    }
    )

    module.exports = model('Add', addSchema);