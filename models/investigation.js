
var mongoose = require("mongoose");


var investigationSchema = new mongoose.Schema(
    {
        rapport:String,
        status:String,
    
    }
    );
    
var Investigation = mongoose.model("Investigation",investigationSchema);    
module.exports = Investigation; 