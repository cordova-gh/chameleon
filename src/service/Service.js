module.exports = class Service {
  paramsQuery(queryObject, reqQueries) {
    if (queryObject) {
      Object.keys(reqQueries).forEach((reqQueryField) => {
        const filterField = reqQueryField.split('.');
        if (filterField.length > 1) {
          if (filterField[1] === 'contains') {
            let reg = new RegExp('^' + reqQueries[reqQueryField] + '.*', 'i');
            queryObject.where(filterField[0], reg);
          }
          else if (filterField[1] === 'equals') {
            queryObject.where(filterField[0], reqQueries[reqQueryField]);
          }
        }
      });
    }
    return queryObject;
  }
  async findById(entityModel, id, populateFields) {
    return await entityModel.findById(id).populate(populateFields);
  }

  async findAll(entityModel, req, res, selectFields, sortFields) {
    let queryObject = entityModel.find();
    queryObject = this.paramsQuery(queryObject, req.query);
    return await queryObject
      .sort(sortFields)
      .select(selectFields);
  }

  getQueryDocument(entity, request, filterBase){
    return this.paramsQuery(entity.find(filterBase), request.query);
  }

  async getEntitiesPagination(Entity, req,filterBase, page, rowsPerPage,sortFields){
    return   this.getQueryDocument(Entity, req, filterBase)
    /*.populate({path:'prodotto.provenienza', 'model':'Country', select:'codiceIsoStato descrizione'})
    .populate({path:'prodotto.marca', 'model':'Marca', select:'codice descrizione'})*/
    .skip(rowsPerPage * page - rowsPerPage)
    .limit(rowsPerPage)
    .sort(sortFields)
    .exec();
  }

  async numEntitiesPagination(Entity, req, filterBase){
    return   this.getQueryDocument(Entity, req, filterBase).countDocuments();
  }
};
