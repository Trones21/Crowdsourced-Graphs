describe("connectDynamoDB", function () {
    it("connect to DynameDB", function (next) {
        console.log("DynamoDB")
        var AWS = require("aws-sdk");

        AWS.config.update({
            region: "us-west-2",
            endpoint: "http://localhost:8000"
        });

        var dynamodb = new AWS.DynamoDB();
        dynamodb.listTables(function (err, data) {
            if (err) {
                console.error("Error:", JSON.stringify(err, null, 2));
                next();
            } else {
                console.log("Response:", JSON.stringify(data, null, 2));
                next();
            }
        });


    });
});


// var params = {
//     TableName : "NewT",
//     KeySchema: [       
//         { AttributeName: "year", KeyType: "HASH"},  //Partition key
//         { AttributeName: "title", KeyType: "RANGE" }  //Sort key
//     ],
//     AttributeDefinitions: [       
//         { AttributeName: "year", AttributeType: "N" },
//         { AttributeName: "title", AttributeType: "S" }
//     ],
//     ProvisionedThroughput: {       
//         ReadCapacityUnits: 10, 
//         WriteCapacityUnits: 10
//     }
// };

