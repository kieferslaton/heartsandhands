import request from 'superagent'
import api from './apikeys'

const CALENDAR_ID = api.CALENDAR_ID
const API_KEY = api.CALENDAR_API
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
                    location: event.location,
                    description: event.description
                })
            })
            callback(events)
        }
    })
}