class EventBuilder {
    constructor() {
        this.event = {
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
    }

    starting(day) {
        this.event.firstDay = day
        this.event.dates = [ day ]
        return this
    }

    get() {
        return this.event
    }
}

module.exports = EventBuilder