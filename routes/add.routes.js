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
        contactEmail: req.body.contactEmail
    }


    if(!addDetails.typeOfAdd){
        return res.status(400).render("adds/add-create", {
                 errorMessage: "Please select a type of ad.",
                  });
    }

    if(!addDetails.category ){
        return res.status(400).render("adds/add-create", {
                 errorMessage: "Please select a category.",
                  });
    }

    if(!addDetails.title ){
        return res.status(400).render("adds/add-create", {
                 errorMessage: "Please make sure to choose a title.",
                  });
    }

    if(!addDetails.description){
        return res.status(400).render("adds/add-create", {
            errorMessage: "Please describe your item.",
             });
    }

    if(!addDetails.condition ){
        return res.status(400).render("adds/add-create", {
                 errorMessage: "Please select a condition.",
                  });
    }

    if(!addDetails.town ){
        return res.status(400).render("adds/add-create", {
                 errorMessage: "Please add your town.",
                  });
    }

    if(!addDetails.contactEmail ){
        return res.status(400).render("adds/add-create", {
                 errorMessage: "Please provide your email.",
                  });
    }

    
    Add.create(addDetails)
        .then(addDetails => {
            res.redirect("/adds");
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
        .then(addDb => {
            res.render("adds/adds-list", { add: addDb })
        })
        .catch(err => {
            console.log("Error", err);
            next(err);
        })
});

//READ ADD DETAILS
router.get("/adds/:addId", isLoggedIn, (req, res, next) => {
    const id = req.params.addId;

    Add.findById(id)
        .then(addDetails => {
            res.render("adds/add-details", addDetails);
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