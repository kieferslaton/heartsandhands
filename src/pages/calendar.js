import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import {
  format,
  subMonths,
  addMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from "date-fns"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { getEvents } from "../gcal"

const useWindowSize = () => {
  const isClient = typeof window === "object"
  const getSize = () => {
    return {
      width: isClient ? window.innerWidth : undefined,
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    const handleResize = () => {
      setWindowSize(getSize())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize.width
}

const BigCalendar = props => {
  const [events, setEvents] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const width = useWindowSize()

  getEvents(events => {
    setEvents(events)
  })

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const renderDays = () => {
    let start = startOfWeek(currentMonth)
    let daysOfWeek = []
    for (let i = 0; i < 7; i++) {
      daysOfWeek.push(
        <div className="col p-0 m-0 text-center">
          <p>{format(addDays(start, i), "EEEE")}</p>
        </div>
      )
    }

    return <div className="row">{daysOfWeek}</div>
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    let day = startDate
    let days = []
    let rows = []

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        let dayEvents = []
        for (let j = 0; j < events.length; j++) {
          let formatStart = format(new Date(events[j].start), "P")
          if (formatStart === format(day, "P")) {
            dayEvents.push(events[j])
          }
        }
        days.push(
          <div className="col cal-cell">
            <p>{format(day, "d")}</p>
            <div className="text-center">
              {dayEvents.map(event => (
                <div class="btn-group dropup mw-100">
                  <button
                    type="button"
                    class="btn btn-secondary dropdown-toggle mw-100"
                    data-toggle="dropdown"
                  >
                    {width > 1200
                      ? event.title + " | " + format(new Date(event.start), "p")
                      : format(new Date(event.start), "p")}
                  </button>
                  <div class="dropdown-menu text-center">
                    <p><span class="font-weight-bold">Start:  </span>{format(new Date(event.start), "p")}</p>
                    <p><span class="font-weight-bold">End:  </span>{format(new Date(event.end), "p")}</p>
                    <p className={event.location ? "" : "d-none"}>
                    <span class="font-weight-bold">Location:  </span>
                      <a
                        href={
                          event.location
                            ? "http://maps.google.com/maps?q=" +
                              event.location.replace(/ /g, "+")
                            : ""
                        }
                        className={event.location ? "" : "d-none"}
                      >
                        {event.location}{" "}
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
        day = addDays(day, 1)
        dayEvents = []
      }
      rows.push(<div className="row">{days}</div>)
      days = []
    }

    return <div className="body">{rows}</div>
  }

  return (
    <div className="container-fluid my-5">
      <div className="row justify-content-center">
        <div className="col-10">
          <div className="header row flex-middle text-center mb-4">
            <div className="col col-start">
              <FaChevronLeft onClick={prevMonth} />
            </div>
            <div className="col col-center font-weight-bold ">{format(currentMonth, "MMMM")}</div>
            <div className="col col-end">
              <FaChevronRight onClick={nextMonth} />
            </div>
          </div>
          {renderDays()}
          {renderCells()}
        </div>
      </div>
    </div>
  )
}

const SmallCalendar = props => {
  const [events, setEvents] = useState([])
  const width = useWindowSize()

  getEvents(events => {
    setEvents(events.sort(function(a,b){
      return new Date(a.start) - new Date(b.start)
    }))
  })

  return (
    <div className="row justify-content-center">
    <div className="col-12 col-sm-10">
    <div className="container-fluid">
      <div className="row justify-content-center">
        <h2>Upcoming Events</h2>
      </div>
      {events.map((event, i) => {

          return (
            <>
            <div class="card-header">
            <button class="btn btn-link w-100" type="button" data-toggle="collapse" data-target={"#collapse"+i}>{event.title} | {format(new Date(event.start), "Pp")}</button>
            </div>
            <div class="collapse" id={"collapse"+i}>
              <div class="card-body">
                <p>{event.title}</p>
                <p>Start: {format(new Date(event.start), "Pp")}</p>
                <p>End: {format(new Date(event.end), "Pp")}</p>
                <p className={event.location ? "" : "d-none"}>
                      Location:
                      <a
                        href={
                          event.location
                            ? "http://maps.google.com/maps?q=" +
                              event.location.replace(/ /g, "+")
                            : ""
                        }
                        className={event.location ? "" : "d-none"}
                      >
                        {event.location}{" "}
                      </a>
                    </p>
              </div>
            </div>
            </>
        )})}
    </div>
    </div>
    </div>
  )
}

const Calendar = props => {
  const width = useWindowSize()

  if (width > 768) {
    return (
      <Layout>
        <SEO title="Calendar" />
        <BigCalendar />
      </Layout>
    )
  } else {
    return (
      <Layout>
        <SEO title="Calendar" />
        <SmallCalendar />
      </Layout>
    )
  }
}

export default Calendar
