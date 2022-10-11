const router = require("express").Router();

const Add = require("../models/Add.model");

const mongoose = require("mongoose");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


//CREATE ADDS
router.get("/adds/create", isLoggedIn, (req, res, next) => {
    Add.find()
        .then((addArr) => {
            res.render("adds/add-create", { addArr });
        })
        .catch(err => {
            console.log("Error", err);
            next(err);
        })
})



router.post("/adds/create", isLoggedIn, (req, res, next) => {

    const addDetails = {
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
        .then(addDetails => {
            res.redirect("adds/adds-list");
        })
        .catch(err => {
            console.log("Error", err);
            next(err);
        })

})



//EDIT ADDS

router.get("/adds/:addId/edit", isLoggedIn, (req, res, next) => {
    Add.findById(req.params.addId)
        .then((addDetails) => {
            res.render("adds/add-edit", addDetails);
        })
        .catch(err => {
            console.log("Error", err);
            next();
        });
});



router.post("/adds/:addId/edit", isLoggedIn, (req, res, next) => {
    const addId = req.params.addId;

    const newAddDetails = {
        typeOfAdd: req.body.typeOfAdd,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        condition: req.body.condition,
        imageUrl: req.body.imageUrl,
        town: req.body.town,
        contactEmail: req.body.contactEmail,
    }

    Add.findByIdAndUpdate(addId, newAddDetails)
        .then(() => {
            res.redirect(`/adds/${addId}`);
        })
        .catch(err => {
            console.log("Error", err);
            next();
        });
});




//READ ADDS
router.get("/adds", (req, res, next) => {
    Add.find()
        .populate("town")
        .then(addDb => {
            res.render("adds/adds-list", { add: addDb })
        })
        .catch(err => {
            console.log("Error", err);
            next(err);
        })
});

//READ ADD DETAILS
router.get("/adds/:addId",isLoggedIn,  (req, res, next) => {
    const id = req.params.addId;

    Add.findById(id)
        .populate("town")
        .then(addDetails => {
            res.render("adds/adds-details", addDetails);
        })
        .catch(err => {
            console.log("Error", err);
            next();
        })
});



//DELETE ADDS
router.post("/adds/:addId/delete", isLoggedIn, (req, res, next) => {
    Add.findByIdAndDelete(req.params.addId)
        .then(() => {
            res.redirect("/adds");
        })
        .catch(err => {
            console.log("Error", err);
            next();
        });

});


  

  module.exports = router;
  