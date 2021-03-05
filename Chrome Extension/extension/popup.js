console.log("script execute start")

//Need to get the request body / payload

chrome.webRequest.onBeforeRequest.addListener(function (details) {

    var body = decodeURIComponent(String.fromCharCode.apply(null,
        new Uint8Array(details.requestBody.raw[0].bytes)));

        //Search for __typename
        if(body.match(/__typename/g)){
            console.log(details.url);
            console.log(body)
        //This is a graphQL endpoint
        //Try introspection Query
        //Send data to crowdsourcedgraphs.com/localhost
         
        }



}, { urls: ["<all_urls>"] },
["requestBody"]);




// chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
//     console.log("Req Sent")
//     console.log(details);

// }, { urls: ["<all_urls>"] },
//     ["extraHeaders","requestHeaders"]);




// chrome.webRequest.onCompleted.addListener(function (details) {
//     console.log("Complete")
//     console.log(details);

// }, { urls: ["<all_urls>"] },
//     ["extraHeaders","responseHeaders"]);




//WebRequest event listeners have 3 args 
//chrome.webRequest.onBeforeRequest.addListener(
//     callback, filter, opt_extraInfoSpec);

