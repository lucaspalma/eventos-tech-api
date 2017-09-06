process.env.DB_URL = 'localhost'
process.env.DB_NAME = 'eventos-tech-api'
require('../src/model/Event')
require('../src/config/mongodb')
let expect = require('chai').expect
let mongoose = require('mongoose')
const EventDao = require('../src/dao/EventDao')

describe('EventDao', () =>{

  let dao

  before(() => {    
    dao = new EventDao()
  })

  beforeEach(async () =>{
    await mongoose.model('Event').remove({}, () => {})
  })

  it(' should return an event inserted at the database ', async () => {  
    let event = {
      name : "FrontInSampa",
      logo : "/img/logos/frontinsampa.svg",
      description : "Melhor evento de FrontEnd em São Paulo",
      firstDay : new Date(2018, 11, 25, 0, 0, 0, 0),
      site : "http://frontinsampa.com.br",
      ticket : "http://frontinsampa.com.br/ticket",
      exist : false,
      tags : [ 'frontend', 'javascript', 'html', 'css', 'ux' ],
      dates : [ new Date(2017, 2, 12, 0, 0, 0, 0) ]
    }
    await dao.new(event)
    await dao.getAll((error, result) => {
      expect(result).to.have.length(1)
      const eventLoaded = result[0]._doc
      expect(eventLoaded).to.eql(event)
    })
  })

  after(() => {
    mongoose.disconnect()
  })
})
