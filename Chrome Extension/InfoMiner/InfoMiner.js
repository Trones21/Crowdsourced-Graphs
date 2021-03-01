class InfoMiner{
  
    constructor(graphQLuri, originalRequestOptions){
      this.originalRequestOptions = originalRequestOptions;
      this.graphQLuri = graphQLuri;
    }
  
     GraphRaw = null;
     IntrospectionDeniedRes = null;
     IntrospectionAllowed = null;
     
     //Implement Later
     RequiredHeaders = null;
     MustbeLoggedInToQuery = null;
     
    async isIntrospectionAllowed() {
     
      try {
          let newOptions = this.originalRequestOptions;
          newOptions.body = "{\"query\":\"" + this.query + "\"}";
          let res = await fetch(this.graphQLuri, newOptions);
          let data = await res.json();
          console.log(data);
        //Need to figure out logic of a working query - Can graphql queries 
        //have different "wrappings" that I need to parse 
        //ex. "{\"query\":\"" + this.query + "\"}" or "[{\"query\":\"" + this.query + "\"}]"
        
        //   if(){
        //       this.IntrospectionAllowed = true;
        //       this.GraphRaw = data;
        //   } else{
        //       this.IntrospectionDeniedRes = data;
        //   }
          
  
      } catch (err) {
          console.log(err)
      }
  
  }

    static query =  `fragment FullType on __Type {\
    kind\
    name\
    fields(includeDeprecated: true) {\
      name\
      args {\
        ...InputValue\
      }\
      type {\
        ...TypeRef\
      }\
      isDeprecated\
      deprecationReason\
    }\
    inputFields {\
      ...InputValue\
    }\
    interfaces {\
      ...TypeRef\
    }\
    enumValues(includeDeprecated: true) {\
      name\
      isDeprecated\
      deprecationReason\
    }\
    possibleTypes {\
      ...TypeRef\
    }\
  }\
  fragment InputValue on __InputValue {\
    name\
    type {\
      ...TypeRef\
    }\
    defaultValue\
  }\
  fragment TypeRef on __Type {\
    kind\
    name\
    ofType {\
      kind\
      name\
      ofType {\
        kind\
        name\
        ofType {\
          kind\
          name\
          ofType {\
            kind\
            name\
            ofType {\
              kind\
              name\
              ofType {\
                kind\
                name\
                ofType {\
                  kind\
                  name\
                }\
              }\
            }\
          }\
        }\
      }\
    }\
  }\
  query IntrospectionQuery {\
    __schema {\
      queryType {\
        name\
      }\
      mutationType {\
        name\
      }\
      types {\
        ...FullType\
      }\
      directives {\
        name\
        locations\
        args {\
          ...InputValue\
        }\
      }\
    }\
  }`;
  }
  
  
  //To test copy from TestQueries.js
  let uri = ""
  let options = ""
  (async() => {
    let infoMiner = new InfoMiner(uri, options);
    await infoMiner.isIntrospectionAllowed();
  })()
  
  
  