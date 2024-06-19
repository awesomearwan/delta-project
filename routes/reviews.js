const express = require("express");
const router = express.Router({mergeParams:true});
const asyncWrap = require("../utliti/wrapAsync.js");
const {validateReview,isAuthenticated,isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controller/review.js");

//review route post

router.post("/",isAuthenticated,validateReview, asyncWrap (reviewController.newReview));
   
   
   //delete review route
   router.delete("/:reviewId",isAuthenticated,isReviewAuthor, asyncWrap (reviewController.deleteReview));


   module.exports = router;