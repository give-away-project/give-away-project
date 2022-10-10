const { Schema, model } = require("mongoose");

const addSchema = new Schema(
    { 

     typeOfAdd: {
          type: String,
          enum: ['offer', 'request'], 
          required: true
     },

     category: {
          enum: ['cinema', 'fine-art',  'litterature', 'music'],
          required: true
     },

       title: {
        type: String,
        required: true, 
       },

       description: {
        type: String,
        required: true,      
       },

       condition: {
          enum: ['new', 'very-good', 'good', 'average', 'to-fix'], 
          required: true
     },

       imageUrl: {
        type: String,
       }, 

       town: { 
          type: String
         },
  
       contactEmail: { 
            type: String, 
            required: true
       }
   
    }
    )

    module.exports = model('Add', addSchema);