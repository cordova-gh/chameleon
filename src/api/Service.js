module.exports = class Service {
  paramsQuery(queryObject, reqQueries) {
    if (queryObject) {
      Object.keys(reqQueries).forEach((reqQueryField) => {
        const filterField = reqQueryField.split('.');
        if (filterField.length > 1) {
          if (filterField[1] === 'contains') {
            console.log('regex', '^' + reqQueries[reqQueryField] + '/');
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
  async getById(entityModel, id, res, populateFields) {
    const entity = await entityModel.findById(id).populate(populateFields);
    return res.json(entity);
  }

  async getAll(entityModel, req, res, selectFields, sortFields) {
    let queryObject = entityModel.find();
    queryObject = this.paramsQuery(queryObject, req.query);
    const entities = await queryObject
      .sort(sortFields)
      .select(selectFields);
    return res.json({
      entities: entities,
    });
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
