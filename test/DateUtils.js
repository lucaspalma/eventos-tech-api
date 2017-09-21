Date.prototype.getYesterday = function() {
    let yesterday = new Date(this)
    yesterday.setDate(this.getDate() - 1)
    return yesterday
}

Date.prototype.getTomorrow = function() {
    let tomorrow = new Date(this)
    tomorrow.setDate(this.getDate() + 1)
    return tomorrow
}

Date.prototype.getNextWeek = function() {
    let nextWeek = new Date(this)
    nextWeek.setDate(this.getDate() + 7)
    return nextWeek
}