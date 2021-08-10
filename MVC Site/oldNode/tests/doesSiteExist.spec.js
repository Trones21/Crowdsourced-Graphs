//Unfinished -
//If the site doesn't exist then we need to add it.
//but if it does exist, what do we do?
//Should we grab it, and compare it to the data we get from the info miner?
//Idea: If introspection isn't possible, then we persist the query AND we try to integrate the new data into the graph 
//Then we persist an updated model of the graph -- We DO NOT want to Overwrite(this will add alot more data to our DB, but we won't lose anything) 
describe("Does site Exist", function () {
    it("Checks if site exists", function (next) {
      var AWS = require("aws-sdk");
      var config = require("../config/dbConfig");
      AWS.config.update({
        region: "us-west-2",
        endpoint: config.server
      });
      var docClient = new AWS.DynamoDB.DocumentClient();
      var obj = {
        TableName:"Sites",
        KeyConditionExpression: "#domain = :x",
        ExpressionAttributeNames:{
            "#domain": "domain"
        },
        ExpressionAttributeValues: {
            ":x": "test.com"
        }
      }

      
      docClient.query(obj, function (err, data) {
        if (err) {
          console.error("Error:", JSON.stringify(err, null, 2));
        } else {
          console.log("Res:", JSON.stringify(data, null, 2));
        }
        next();
      });
    });
  });