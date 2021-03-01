const { json } = require('express');
const fs = require('fs');

describe("addSite", function(){
 it("adds the site to the file", function(next){
   console.log("Running")
   let newObj = {}; 
   newObj.name = "site.com";
   newObj.prop = "words";
   let filePath = './public/collections/sitesCollection.json';
    fs.readFile(filePath, (error, data) => {
    if (error) {
    console.log(error);
    return;
    }
    let arr = Array.from(JSON.parse(data));
    if(arr.filter(i => i.name == newObj.name).length > 0){
       //Object exists, so Update
       console.log("Object Exists")
       next();
    }else{
      //Rewrites entire file with new object
      arr.push(newObj);
      let str = JSON.stringify(arr);

      fs.writeFile(filePath, str, function(callback){
         console.log("Done Writing")
         next();
      });
    }
    
    //next(); 
   })
 } )
})