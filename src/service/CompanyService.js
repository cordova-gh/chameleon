const Entity = require('../models/Company');
const Anagrafica = require('../models/Anagrafica');
const Service = require('./Service');

class CompanyService extends Service {
  async getAllPaginated(request) {
    const rowsPerPage = Number(request.query.rowsPerPage) || 10;
    const page = request.query.page || 1;
    const entities = await Entity.find().populate(
      'anagrafica anagrafica.entitaGiuridica.indirizzoSedeLegale.stato'
    );
    /*.populate({ 
          path : 'anagrafica',
          populate : { path : 'entitaGiuridica.indirizzoSedeLegale.stato'}//to find friends of friends
      });*/

    const numOfEntities = await Entity.countDocuments();
    return {
      entities: entities,
      numOfEntities: numOfEntities,
      page: page,
      rowsPerPage: rowsPerPage
    }
  }

  async getById(id) {
    return await this.findById(Entity, id);
  }

  async create(body) {
    const companyBody = body;
    companyBody.descrizione =
      companyBody.anagrafica.entitaGiuridica.descrAttivita;
    companyBody.anagrafica.codice = companyBody.codice;
    companyBody.anagrafica.descrizione =
      companyBody.anagrafica.entitaGiuridica.descrAttivita;
    companyBody.anagrafica.tipoAnagrafica = 'PG';
    companyBody.anagrafica.stAnagrafica = 'O';
    companyBody.anagrafica.titolo = 'SRL';
    companyBody.anagrafica.isCompany = true;
    const anagraficaId = await salvaAnagrafica(companyBody.anagrafica);

    const companyToInsert = new Entity({
      codice: companyBody.codice,
      descrizione: companyBody.descrizione,
      anagrafica: anagraficaId,
    });
    await companyToInsert.save();

  }

  async updateById(id, body) {
    const user = body;
    const anagraficaId = await salvaAnagrafica(req.body.anagrafica);
    delete req.body.anagrafica;
    user['anagrafica'] = anagraficaId;
    await Entity.findByIdAndUpdate(id, user);
  }

  async deleteById(id) {
    await Entity.findByIdAndRemove(id);
  }

  async salvaAnagrafica(anagraficaBody) {
    const id = anagraficaBody._id;
    if (id) {
      await Anagrafica.findByIdAndUpdate(id, anagraficaBody);
      return id;
    } else {
      let anagrafica = new Anagrafica(anagraficaBody);
      await anagrafica.save(anagrafica);
      return anagrafica._id;
    }
  }
}

module.exports = CompanyService;
