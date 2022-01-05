import request from "superagent"

console.log(process.env.GATSBY_CALENDAR_ID)

const CALENDAR_ID = process.env.GATSBY_CALENDAR_ID
const API_KEY = process.env.GATSBY_CALENDAR_API
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

export function getEvents(callback) {
  request.get(url).end((err, resp) => {
    if (!err) {
      const events = []
      JSON.parse(resp.text).items.map(event => {
        console.log(event.start);
        events.push({
          id: event.id,
          start: event.start.date || event.start.dateTime,
          end: event.end.date || event.end.dateTime,
          title: event.summary,
          location: event.location,
          description: event.description,
        })
      })
      console.log(events)
      callback(events)
    }
  })
}
