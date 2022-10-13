const Ad = require("../models/Ad.model");
const router = require("express").Router();

/* GET home page */
// router.get("/", (req, res, next) => {
//   // res.render("index");
// });

router.get("/", (req, res, next) => {
  Ad.find()
      .then(adDb => {
          res.render("index", { ad: adDb })
      })
      .catch(err => {
          console.log("Error", err);
          next(err);
      })
});

module.exports = router;
