import request from 'superagent'

const CALENDAR_ID = "45rbm4dttbq196qhgc9rkuur4c@group.calendar.google.com"
const API_KEY = "AIzaSyDaXiyGvW2bfOIkrM6wLWMnNhgK25POl7w"
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

export function getEvents(callback) {
    request.get(url).end((err, resp) => {
        if (!err) {
            const events = []
            JSON.parse(resp.text).items.map((event) => {
                events.push({
                    start: event.start.date || event.start.dateTime,
                    end: event.end.date || event.end.dateTime,
                    title: event.summary,
                    location: event.location
                })
            })
            callback(events)
        }
    })
}