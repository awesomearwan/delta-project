const geocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req,res)=>{

    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
  };



  module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
  };


  module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
     const listing = await Listing.findById(id)
     .populate({path:"reviews",
       populate:{
        path:"author",
      },
    })
     .populate("owner");
     if(!listing){
      req.flash("error","Listing Does Not Exist!");
      res.redirect("/listing");
     };
     res.render("listings/show.ejs",{listing});
  
  };


  module.exports.createListing = async (req,res,next)=>{
   let response = await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1
    })
      .send();
    
      

    let url = req.file.path;
    let filename = req.file.filename;
    const newlisting = new Listing(req.body.listing) ;
    newlisting.owner = req.user._id;
    newlisting.image = {url,filename};
    newlisting.geometry = response.body.features[0].geometry;
     let savedListing = await newlisting.save();
    console.log(savedListing);
    req.flash("success","New Listing Created!");
    res.redirect("/listing");
  
  };


  module.exports.editListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
  console.log(listing);
  if(!listing){
    req.flash("error","Listing Does Not Exist!");
    res.redirect("/listing");
   }
   let orignalImgUrl = listing.image.url;
   orignalImgUrl = orignalImgUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,orignalImgUrl});
  };


  module.exports.updateListing =  async (req,res)=>{
   
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = {url,filename};
      await listing.save();
    }
    req.flash("success","Listing Updated!");
    res.redirect(`/listing/${id}`);
  };


  module.exports.deleteListing =  async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listing");
  }