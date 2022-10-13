const { Schema, model } = require("mongoose");

const adSchema = new Schema(
    { 

     typeOfAd: {
          type: String,
          enum: ['offer', 'request'], 
          required: [true, 'Choose a type of ad.']
     },

     category: {
          type: String,
          enum: ['cinema', 'fine-art',  'litterature', 'music'],
          required: [true, 'Select a category.']
     },

       title: {
        type: String,
        required: [true, 'The title is required.']
       },

       description: {
        type: String,
        required: [true, 'Describe your item.']    
       },

       condition: {
          type: String,
          enum: ['new', 'very-good', 'good', 'average', 'to-fix'], 
          required: [true, 'Select a condition.']
     },

       imageUrl: {
        type: String,
       }, 

       town: { 
          type: String
         },
  
       contactEmail: { 
            type: String, 
            required: [true, 'Provide your email.']
       }, 

       creator: { 
          type: Schema.Types.ObjectId,
          ref: "User"
     },

    }
    )

    module.exports = model('Ad', adSchema);