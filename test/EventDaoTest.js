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
  const today = new Date()
  const yesterday =  today.getYesterday()
  const tomorrow =  today.getTomorrow()
  const nextWeek =  today.getNextWeek()

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

  it(' should return the next 2 events ', async () => {
    let eventYesterday = mother.createAnEvent().starting(yesterday).get()
    let eventToday = mother.createAnEvent().starting(today).get()
    let eventTomorrow = mother.createAnEvent().starting(tomorrow).get()
    let eventNextWeek = mother.createAnEvent().starting(nextWeek).get()
    await dao.new(eventToday)
    await dao.new(eventYesterday)
    await dao.new(eventTomorrow)
    await dao.new(eventNextWeek)
    let events;
    return dao.getNextByAmount(2, (error, result) => {
      events = getEventsFrom(result)
    }).then(() => {
      expect(events).to.deep.equal([eventToday, eventTomorrow])
    })
  })

  it(' should return events with tag java ', async () => {
    let eventToday = mother.createAnEvent().starting(today).withTags(["java", "spring"]).get()
    let eventTomorrow = mother.createAnEvent().starting(tomorrow).withTags(["spring"]).get()
    let eventNextWeek = mother.createAnEvent().starting(nextWeek).withTags(["java"]).get()
    await dao.new(eventToday)
    await dao.new(eventTomorrow)
    await dao.new(eventNextWeek)
    await dao.getAllNextInATag("java", (error, result) => {
      let events = getEventsFrom(result)
      expect(events).to.deep.equal([eventToday, eventNextWeek])
    })
  })

  it(' should return only the future events in a tag ', async () => {
    let eventYesterday = mother.createAnEvent().starting(yesterday).withTags(["java"]).get()
    let eventToday = mother.createAnEvent().starting(today).withTags(["java"]).get()
    await dao.new(eventToday)
    await dao.new(eventYesterday)
    await dao.getAllNextInATag("java", (error, result) => {
      let events = getEventsFrom(result)
      expect(events).to.deep.equal([eventToday])
    })
  })

  it(' should return events by amount with tag java ', async () => {
    let eventToday = mother.createAnEvent().starting(today).withTags(["java", "spring"]).get()
    let eventTomorrow = mother.createAnEvent().starting(tomorrow).withTags(["spring"]).get()
    let eventNextWeek = mother.createAnEvent().starting(nextWeek).withTags(["java"]).get()
    await dao.new(eventToday)
    await dao.new(eventTomorrow)
    await dao.new(eventNextWeek)
    await dao.getlNextInTagByAmount("java", 2, (error, result) => {
      let events = getEventsFrom(result)
      expect(events).to.deep.equal([eventToday, eventNextWeek])
    })
  })

  it(' should return only the future events in a tag by amount ', async () => {
    let eventYesterday = mother.createAnEvent().starting(yesterday).withTags(["java"]).get()
    let eventToday = mother.createAnEvent().starting(today).withTags(["java"]).get()
    await dao.new(eventToday)
    await dao.new(eventYesterday)
    await dao.getlNextInTagByAmount("java", 1, (error, result) => {
      let events = getEventsFrom(result)
      expect(events).to.deep.equal([eventToday])
    })
  })

    it(' should return the next 2 events in a tag ', async () => {
    let eventToday = mother.createAnEvent().starting(today).withTags(["java"]).get()
    let eventTomorrow = mother.createAnEvent().starting(tomorrow).withTags(["java"]).get()
    let eventNextWeek = mother.createAnEvent().starting(nextWeek).withTags(["java"]).get()
    await dao.new(eventToday)
    await dao.new(eventTomorrow)
    await dao.new(eventNextWeek)
    await dao.getlNextInTagByAmount("java", 2, (error, result) => {
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
