
var express=require("express");
const promisify = require("es6-promisify");
var router=express.Router();
var Plainte = require("../models/plainte");
var Investigation = require("../models/investigation");
var User = require("../models/user");
const mail = require("../handlers/mail");


// PLAINT  ROUTES



// Index page with all the plaint

router.get("/plaint",isLoggedIn,function(req,res){
    
   
    
    
    Plainte.find({},function(err,allPlaints){
        if(err)
        {
            console.log(err);
        }
        else
        {
            //res.render('index',{plaints:allPlaints,currentUser:req.user});
            
            var perPage = 3;
            var pageQuery = parseInt(req.query.page);
            var pageNumber = pageQuery ? pageQuery : 1;
            Plainte.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allPlaints) {
                Plainte.count().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("index", {
                    plaints: allPlaints,
                    currentUser:req.user,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
        }
        
    })
});

// Create new plaint
router.get("/plaint/new",isLoggedIn,function(req,res){
    
    User.find({},function(err,foundUsers){
        if(err)
        {
            console.log(err);
        }
        else
        {
           res.render("newPlaint",{currentUser:req.user,allUsers:foundUsers}); 
        }
    } )
    
    
})

// Deleted Plaint Route
router.delete("/plaint/:id",isLoggedIn,isAssigned,function(req,res){
    Plainte.findByIdAndDelete(req.params.id,function(err,detetedPlaint){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("Your plaint was successfully deleted")
            res.redirect("/plaint");
        }
        
    })
})


// Show Route

router.get("/plaint/:id",isLoggedIn,function(req,res){
    Plainte.findById(req.params.id,function(err,foundPlainte){
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.render("show",{plaint:foundPlainte, currentUser:req.user});
        }
    })
    
})

// Edit Plaint page
router.get("/plaint/:id/edit",isLoggedIn,function(req,res){
    Plainte.findById(req.params.id,function(err,foundPlainte){
        if(err)
        {
            console.log(err);
        }
        else
        {
        
            res.render("edit",{plainte:foundPlainte,currentUser:req.user});
        }
    })
});

// Edit the plaint

router.put("/plaint/:id",isLoggedIn,isAssigned,function(req,res){
    
    Plainte.findByIdAndUpdate(req.params.id,req.body.plainte,function(err,updatedPlainte){
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                           
                            console.log(updatedPlainte);
                            res.redirect("/plaint/" + req.params.id);
                        }
    }) 
   
 
   });


//  Create new Plainte route


// Save to MongoDB , create new plainte
router.post("/plaint",isLoggedIn,function(req,res){
    Plainte.create(req.body.plainte,function(err, newPlainte){
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log(req.body.plainte);
            
            
            
            User.find({username:req.body.plainte.assigned},function(err,assignU){
                
                if(err)
                {
                    console.log(err);
                }
                else
                {
                   
                // console.log(assignU); 
                // mail.send(
                //     {
                //   user:assignU[0].email,
                //   subject:'This is  a test message hurray!!! ', // Subject line
                
                //     });
                    
                     req.flash("info"," Vous venez d'ouvrir une plainte")
                     res.redirect("/plaint");
                    
                }
                
                
            })
          
                   
    
                
            
        }
    })
});


// MIDDLEWARE

function isAssigned(req,res,next){
    
    Plainte.findById(req.params.id,function(err, foundPlainte){
    if(err)
    {
        console.log(err)
    }
    else
    {
        if(req.user.isAdmin||foundPlainte.assigned ===req.user.username)
        {
           
            next();
        }
        
        else
        {
            
            console.log("you do not have permissions to edit this plaint")
            res.redirect("back");
        }
    }
    
    })
}





function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Pour accéder au plateforme vous devrez d'abord  vous connecter");
    res.redirect("/login");
}


module.exports= router;
