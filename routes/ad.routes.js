const router = require("express").Router();

const Ad = require("../models/Ad.model");

// ********* require fileUploader in order to use it *********
const fileUploader = require('../config/cloudinary.config');

const mongoose = require("mongoose");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const { populate } = require("../models/Ad.model");



//CREATE ADS
router.get("/ads/create", isLoggedIn, (req, res, next) => {
    Ad.find()
        .then((adArr) => {
            res.render("ads/ad-create", { adArr });
        })
        .catch(err => {
            console.log("Error", err);
            next(err);
        })
})



router.post("/ads/create", fileUploader.single('imageUrl'), isLoggedIn, (req, res, next) => {

    const adDetails = {
        typeOfAd: req.body.typeOfAd,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        condition: req.body.condition,
        imageUrl: req.file?.path,
        town: req.body.town,
        contactEmail: req.body.contactEmail,
        creator: req.session.user._id
    }


    if(!adDetails.typeOfAd){
        return res.status(400).render("ads/ad-create", {
                 errorMessage: "Please select a type of ad.",
                  });
    }

    if(!adDetails.category ){
        return res.status(400).render("ads/ad-create", {
                 errorMessage: "Please select a category.",
                  });
    }

    if(!adDetails.title ){
        return res.status(400).render("ads/ad-create", {
                 errorMessage: "Please make sure to choose a title.",
                  });
    }

    if(!adDetails.description){
        return res.status(400).render("ads/ad-create", {
            errorMessage: "Please describe your item.",
             });
    }

    if(!adDetails.condition ){
        return res.status(400).render("ads/ad-create", {
                 errorMessage: "Please select a condition.",
                  });
    }

    if(!adDetails.town ){
        return res.status(400).render("ads/ad-create", {
                 errorMessage: "Please add your town.",
                  });
    }

    if(!adDetails.contactEmail ){
        return res.status(400).render("ads/ad-create", {
                 errorMessage: "Please provide your email.",
                  });
    }

    
    Ad.create(adDetails)
        .then(newlyCreatedAdFromDB => {
            console.log(newlyCreatedAdFromDB);
            res.redirect("/user-ads");
        } )
        // .then(adDetails => {
        //     res.redirect("/user-ads");
        // })
        .catch(err => {
            console.log("Error while creating a new ad", err);
            next(err);
        })

})



//EDIT ADS

router.get("/ads/:adId/edit", isLoggedIn, (req, res, next) => {
    Ad.findById(req.params.adId)
        .then((adDetails) => {
            res.render("ads/ad-edit", adDetails);
        })
        .catch(err => {
            console.log("Error", err);
            next();
        });
});



router.post("/ads/:adId/edit", isLoggedIn, (req, res, next) => {
    const adId = req.params.adId;

    const newAdDetails = {
        typeOfAd: req.body.typeOfAd,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        condition: req.body.condition,
        imageUrl: req.body.imageUrl,
        town: req.body.town,
        contactEmail: req.body.contactEmail,
        creator: req.body.creator
    }

    Ad.findByIdAndUpdate(adId, newAdDetails)

        .then(() => {

            res.redirect(`/user-ads`);
        })
        .catch(err => {
            console.log("Error", err);
            next();
        });
});




//READ ADDS in /ads
router.get("/ads", (req, res, next) => {
    Ad.find()
        .sort({ updatedAt: -1 })
        .then(adDb => {
            res.render("ads/ads-list", { ad: adDb })
        })
        .catch(err => {
            console.log("Error", err);
            next(err);
        })
});



//READ ADD DETAILS
router.get("/ads/:adId", isLoggedIn, (req, res, next) => {
    const id = req.params.adId;

    Ad.findById(id)
        .then(adDetails => {
            res.render("ads/ad-details", adDetails);
        })
        .catch(err => {
            console.log("Error", err);
            next();
        })
});


// DISPLAY ADS FROM USER IN SESSION

router.get('/user-ads', isLoggedIn, (req, res, next) => {
    Ad.find({creator: req.session.user._id})
    .then( listAdfromDb => {
        
         console.log("the array .." + listAdfromDb);
      // console.log("Sesion logedin.. " + req.session.user._id);
      res.render("users/user-ads", {list:listAdfromDb});
  
    })
    .catch((err) => {
      next(err); 
    });
    
  });


//READ ADS in user ads
router.get("/user-ads", (req, res, next) => {
    Ad.find()
        .then(adDb => {
            res.render("users/user-ads", { ad: adDb })
        })
        .catch(err => {
            console.log("Error", err);
            next(err);
        })
});

  

//READ ADS DETAILS FROM USER PROFILE
router.get("/user-ads/:adId", isLoggedIn, (req, res, next) => {
    const id = req.params.adId;

    Ad.findById(id)
        .then(adDetails => {
            res.render("users/user-ad-details", adDetails);
        })
        .catch(err => {
            console.log("Error", err);
            next();
        })
});





//DELETE ADDS
router.post("/ads/:adId/delete", isLoggedIn, (req, res, next) => {
    Ad.findByIdAndDelete(req.params.adId)
        .then(() => {
            res.redirect("/user-ads");
        })
        .catch(err => {
            console.log("Error", err);
            next();
        });
});




module.exports = router;