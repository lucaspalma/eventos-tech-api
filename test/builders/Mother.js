const EventBuilder = require('./EventBuilder')

class Mother {
    createAnEvent() {
        return new EventBuilder()
    }
}

module.exports = Mother