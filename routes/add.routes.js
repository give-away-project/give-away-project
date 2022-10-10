const router = require("express").Router();

const Add = require("../models/Add.model");

const mongoose = require("mongoose");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


// List all adds
router.get("/adds", (req, res) => {
    Add.find()
    .then( addsFromDB => {
        res.render("adds/adds-list", addsFromDB)
    })
    .catch( err => {
      console.log("error getting adds from DB", err);
      next(err);
    })
});

//Adds details
router.get("/adds/:addId", isLoggedIn,(req, res, next) => {
    const id = req.params.addId;
  
    Add.findById(id)
      .then( addDetails => {
        res.render("adds/add-details", addDetails);
      } )
      .catch( err => {
        console.log("error getting add details from DB", err);
        next();
      })
  });

  //CREATE: display form
router.get("/adds/create", isLoggedIn, (req, res, next) => {

    const addInformation = {
        typeOfAdd: req.body.typeOfAdd,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        condition: req.body.condition,
        imageUrl: req.body.imageUrl,
        town: req.body.town,
        contactEmail: req.body.contactEmail,   
    }

    Add.create(addDetails)
    .then(()=> {
        res.redirect("/adds");
    })
    .catch(err => {
        console.log("error creating new add in DB", err);
        next(err);
    })

  });

  // Update: display form
  router.get("/adds/:addId/edit", isLoggedIn, (req, res, next) => {
    Book.findById(req.params.bookId)
      .then( (bookDetails) => {
        res.render("books/book-edit", bookDetails);
      })
      .catch( err => {
        console.log("Error getting book details from DB...", err);
        next();
      });
  });


  

  module.exports = router;
  