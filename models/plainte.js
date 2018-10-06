

var mongoose = require("mongoose");
var Investigation = require("./investigation");

var plainteSchema = new mongoose.Schema(
    
    {
        plaignant_name:String,
        source:String,
        location:String,
        sujet:String,
        date_soumission:Date,
        description:String,
        status:String,
        date_reunion:Date,
        assigned:String,
        investigations:                 
            [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"Investigation"
                }
                
            ]
            
            
    });

module.exports = mongoose.model("Plainte",plainteSchema);    
 

    