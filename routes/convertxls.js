var excel = require("node-excel-export");
var express=require("express");
var router=express.Router();
var Plainte = require("../models/plainte");
var Investigation = require("../models/investigation");
var User = require("../models/user");



router.get("/excel",function(req,res){
   

Plainte.find({},function(err,found){
    
    var dataset = found;
    console.log(dataset);
    
    if(err)
    {
        console.log(err);
    }
    else
    {
        
        
        
            const styles = {
              headerDark: {
                fill: {
                  fgColor: {
                    rgb: 'FF000000'
                  }
                },
                font: {
                  color: {
                    rgb: 'FFFFFFFF'
                  },
                  sz: 14,
                  bold: true,
                  underline: true
                }
              },
              cellPink: {
                fill: {
                  fgColor: {
                    rgb: 'FFFFCCFF'
                  }
                }
              },
              cellGreen: {
                fill: {
                  fgColor: {
                    rgb: 'FF00FF00'
                  }
                }
              }
            };

         // end of styling
        
        const heading = [
                  [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
                  ['a2', 'b2', 'c2'] // <-- It can be only values
                ];
                
      // end of heading
      
      
        const specification = {
            
          plaignant_name: { // <- the key should match the actual data key
          displayName: 'Nom du Plaignant', // <- Here you specify the column header
          headerStyle: styles.headerDark, // <- Header style
            width: 120 // <- width in pixels
           },
           
           source: { // <- the key should match the actual data key
          displayName: 'Catégorie du Plaignant', // <- Here you specify the column header
          headerStyle: styles.headerDark, // <- Header style
            width: 120 // <- width in pixels
           },
           
            location: { // <- the key should match the actual data key
          displayName: 'Location du Plaignant', // <- Here you specify the column header
          headerStyle: styles.headerDark, // <- Header style
            width: 120 // <- width in pixels
           },
           
            sujet: { // <- the key should match the actual data key
          displayName: 'Sujet de la plainte', // <- Here you specify the column header
          headerStyle: styles.headerDark, // <- Header style
            width: 120 // <- width in pixels
           },
           
             date_soumission: { // <- the key should match the actual data key
          displayName: 'Date de soumission de la plainte', // <- Here you specify the column header
          headerStyle: styles.headerDark, // <- Header style
            width: 120 // <- width in pixels
           },
           
             description: { // <- the key should match the actual data key
          displayName: 'Description de la plainte', // <- Here you specify the column header
          headerStyle: styles.headerDark, // <- Header style
            width: 120 // <- width in pixels
            
           },
           
             date_reunion: { // <- the key should match the actual data key
          displayName: 'Date de la Reunion CRM', // <- Here you specify the column header
          headerStyle: styles.headerDark, // <- Header style
            width: 120 // <- width in pixels
            
           },
           
             assigned: { // <- the key should match the actual data key
          displayName: 'Personne de Reference', // <- Here you specify the column header
          headerStyle: styles.headerDark, // <- Header style
            width: 120 // <- width in pixels
            
           },
           
             status: { // <- the key should match the actual data key
          displayName: 'Status de la plainte', // <- Here you specify the column header
          headerStyle: styles.headerDark, // <- Header style
            width: 120 // <- width in pixels
            
           },
           
           
           
           
           
           
           
           
  

}
      
            // The merges are independent of the data.
            // A merge will overwrite all data _not_ in the top-left cell.
            const merges = [
              { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
              { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
              { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
            ]
            
                        // Create the excel report.
            // This function will return Buffer
            const report = excel.buildExport(
              [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
                {
                  name: 'CRM', // <- Specify sheet name (optional)
                  heading: heading, // <- Raw heading array (optional)
                  merges: merges, // <- Merge cell ranges
                  specification: specification, // <- Report specification
                  data: dataset // <-- Report data
                }
              ]
            );
            
            res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers)
            return res.send(report);


        
    }
})    
    
    
})








module.exports= router;