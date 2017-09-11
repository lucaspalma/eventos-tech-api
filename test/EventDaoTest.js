process.env.DB_URL = 'localhost'
process.env.DB_NAME = 'eventos-tech-api'
require('../src/model/Event')
require('../src/config/mongodb')
require('./DateUtils')
let expect = require('chai').expect
let mongoose = require('mongoose')
const EventDao = require('../src/dao/EventDao')
const Mother = require('./builders/Mother')

describe('EventDao', () =>{

  let dao
  const mother = new Mother()

  before(() => {    
    dao = new EventDao()
  })

  beforeEach(async () =>{
    await mongoose.model('Event').remove({}, () => {})
  })

  it(' should return an event inserted at the database ', async () => {  
    let event = mother.createAnEvent().get()
    await dao.new(event)
    await dao.getAll((error, result) => {
      let events = getEventsFrom(result)
      expect(events).to.deep.equal([event])
    })
  })

  it(' should return all previous events ', async () => {
    let today = new Date()
    let yesterday =  today.getYesterday()
    let tomorrow =  today.getTomorrow()
    let eventYesterday = mother.createAnEvent().starting(yesterday).get()
    let eventToday = mother.createAnEvent().starting(today).get()
    let eventTomorrow = mother.createAnEvent().starting(tomorrow).get()
    await dao.new(eventToday)
    await dao.new(eventYesterday)
    await dao.new(eventTomorrow)
    await dao.getAllPrevious((error, result) => {
      let events = getEventsFrom(result)
      expect(events).to.deep.equal([eventYesterday])
    })
  })

  it(' should return all upcomming events ', async () => {
    let today = new Date()
    let yesterday =  today.getYesterday()
    let tomorrow =  today.getTomorrow()
    let eventYesterday = mother.createAnEvent().starting(yesterday).get()
    let eventToday = mother.createAnEvent().starting(today).get()
    let eventTomorrow = mother.createAnEvent().starting(tomorrow).get()
    await dao.new(eventToday)
    await dao.new(eventYesterday)
    await dao.new(eventTomorrow)
    await dao.getAllNext((error, result) => {
      let events = getEventsFrom(result)
      expect(events).to.deep.equal([eventToday, eventTomorrow])
    })
  })

  after(() => {
    mongoose.disconnect()
  })

  function getEventsFrom(result) {
    return result.map((event) => event._doc)
  }
})
