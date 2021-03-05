const { json } = require('express');
const fs = require('fs');

let newSite = {};
newSite.domain = "test.com";
newSite.siteID = 6;

describe("addSitevFile", function () {
  it("add/update site", function (next) {

    let filePath = './public/collections/sitesCollection.json';
    fs.readFile(filePath, (error, data) => {
      if (error) {
        console.log(error);
        return;
      }
      let arr = Array.from(JSON.parse(data));
      if (arr.filter(i => i.name == newSite.name).length > 0) {
        //Object exists, so Update
        console.log("Object Exists")
        next();
      } else {
        //Rewrites entire file with new object
        arr.push(newSite);
        let str = JSON.stringify(arr);

        fs.writeFile(filePath, str, function (callback) {
          console.log("Done Writing")
          next();
        });
      }
    })
  })
})

describe("addSiteDynamoDB", function () {
  it("add/update the site to DynameDB", function (next) {
    console.log("add site DynamoDb")
    var AWS = require("aws-sdk");
    AWS.config.update({
      region: "us-west-2",
      endpoint: "http://localhost:8000"
    });
    var docClient = new AWS.DynamoDB.DocumentClient();
    var obj = {
      TableName:"Sites",
      Item:{
        "domain":newSite.domain,
        "siteID":newSite.siteID
      }
    }
    docClient.put(obj, function (err, data) {
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
      }
      next();
    });
  });
});