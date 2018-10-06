
var express=require("express");

//able to have access to the id from Plainte.js
var router=express.Router({mergeParams:true});
var Plainte = require("../models/plainte");
var Investigation = require("../models/investigation");

var middleware = require("../middleware");

//INVESTIGATION ROUTES

router.get("/plaint/:id/investigation/new",isLoggedIn,function(req,res){
    
    
    res.render("investigation/create",{plainte_id :req.params.id});
})

// CREATE INVESTIGATION
router.post("/plaint/:id/investigation/",isLoggedIn,function(req,res){
    
    Plainte.findById(req.params.id,function(err,foundPlainte){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(req.body.investigation, foundPlainte);
            
            Investigation.create(req.body.investigation, function(err,newInvest){
                
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    foundPlainte.investigations.push(newInvest);
            
                    foundPlainte.save(function(err,invest){
                            if(err)
                            {
                                console.log(err)
                            }
                            else
                            {
                                console.log(invest);
                                
                                
                                req.flash("some","Votre Rapport d'investigation a été bien rempli!")
                                
                                res.redirect('/plaint');
                            }
            })
                    
                    
                }
            })
            
            
        }
    })
})




// Show investigation for any plaint

router.get("/plaint/:id/investigation/:investigation_id",isLoggedIn,function(req,res){
    
   var plaint_id = req.params.id;
   
   Investigation.findById(req.params.investigation_id,function(err,foundInv){
     if(err)
     {
         console.log(err);
     }
     else
     {
         res.render("investigation/show",{ plainteid:plaint_id,investigation:foundInv,currentUser:req.user});
     }
   })
    
}); 

// Edit Investigation 

router.get("/plaint/:id/investigation/:investigation_id/edit",isLoggedIn,function(req,res){
    Plainte.findById(req.params.id,function(err,foundPlainte){
        if(err)
        {
            console.log(err);
        }
        else
        {
            Investigation.findById(req.params.investigation_id,function(err,foundInv){
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    res.render("investigation/edit",{ investigation:foundInv,plainte:foundPlainte,currentUser:req.user});
                }
            })
        }
    })
});









router.put("/plaint/:id/investigation/:investigation_id",isLoggedIn,function(req,res){
    console.log(req.body.investigation, req.params.investigation_id);
    Investigation.findByIdAndUpdate(req.params.investigation_id, req.body.investigation,function(err,updatedInv){
        
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log(updatedInv);
            res.redirect("/plaint");
        }
    })
})


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Pour accéder au plateforme vous devez vous connecter");
    res.redirect("/login");
}


module.exports = router;