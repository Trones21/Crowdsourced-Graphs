var AWS = require("aws-sdk");
var config = require("../config/dbConfig")
console.log("Create DB");

console.log(config);


AWS.config.update({
    region: "us-west-2",
    endpoint: config.server
});

var dynamodb = new AWS.DynamoDB();
var tableInfo = {
    TableName:"Sites",
    KeySchema: [       
        { AttributeName: "domain", KeyType: "HASH"},  //Partition key
        { AttributeName: "siteID", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "siteID", AttributeType: "N" },
        { AttributeName: "domain", AttributeType: "S" }     
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
}
dynamodb.createTable(tableInfo,function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});


// {AttributeName: "isIntrospectionAllowed", AttributeType:"BOOL"},
