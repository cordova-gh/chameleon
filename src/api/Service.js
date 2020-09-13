module.exports = class Service {
paramsQuery(queryObject, reqQueries) {
    if(queryObject){
        Object.keys(reqQueries).forEach(
          reqQueryField => {
            const filterField = reqQueryField.split(".");
            if(filterField.length>1){
                if(filterField[1] === 'contains'){
                    console.log('regex', '^'+reqQueries[reqQueryField]+ '/');
                    let reg = new RegExp('^'+reqQueries[reqQueryField]+ '.*', "i");
                    queryObject.where(filterField[0], reg);
                  }
            }

          }
        )
      }
      return queryObject;
  }
}
