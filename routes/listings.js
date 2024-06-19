const express = require("express");
const router = express.Router();
const asyncWrap = require("../utliti/wrapAsync.js");
const {isAuthenticated,isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controller/listing.js")
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router
  .route("/")
  .get( asyncWrap (listingController.index))
  .post( 
     upload.single('listing[image]'),
     validateListing,
     asyncWrap 
     ( listingController.createListing));
 

router
   .get("/new",isAuthenticated,
     asyncWrap 
     (listingController.renderNewForm));

router
    .route("/:id")
    .get( asyncWrap (listingController.showListing))
    .put(isAuthenticated,
     isOwner,
     upload.single('listing[image]'),
     validateListing,
     asyncWrap (listingController.updateListing))
    .delete(isAuthenticated,isOwner,asyncWrap (listingController.deleteListing));      

router
    .get("/:id/edit"
     ,isAuthenticated
     ,asyncWrap 
     (listingController.editListing));
  
     module.exports = router;