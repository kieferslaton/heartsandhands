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
  getMonth
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

  useEffect(() => {
    getEvents(events => {
      setEvents(
        events.sort(function (a, b) {
          return new Date(a.start) - new Date(b.start)
        })
      )
    })
  }, [])

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
            <p className={(getMonth(day) == getMonth(currentMonth)) ? 'active-month' : 'inactive-month'}>{format(day, "d")}</p>
            <div className="text-center">
              {dayEvents.map(event => (
                <div class={`btn-group mw-100 ${(i <=4 ) ? 'dropright' : 'dropleft'}`}>
                  <button
                    type="button"
                    class="btn dropdown-toggle mw-100"
                    data-toggle="dropdown"
                  >
                    {width > 1200
                      ? event.title + " | " + format(new Date(event.start), "p")
                      : format(new Date(event.start), "p")}
                  </button>
                  <div class="dropdown-menu p-0 m-0">
                  <div class="card-body event p-0 m-0">
                      <div
                        class={`font-weight-bold w-100 m-0 event-header ${
                          i % 3 == 0
                            ? "event-bg-1"
                            : i % 3 == 1
                            ? "event-bg-2"
                            : "event-bg-3"
                        }`}
                      >
                        <div class="overlay pt-2 h-100 align-items-center">
                          <p className="font-weight-bold">{event.title.toUpperCase()}</p>
                        </div>
                      </div>
                      <div className="event-content px-3">
                      <p>
                        <span class="font-weight-bold">Time: </span>
                        {format(new Date(event.start), "Pp")}-{format(new Date(event.end), "p")}
                      </p>
                      <p className={event.location ? "" : "d-none"}>
                        <span class="font-weight-bold">Location: </span>
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
                      <p className={event.description ? "" : "d-none"}>{event.description}</p>
                      </div>
                    </div>
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
          <div style={{fontSize: '1.5em'}} className="header row flex-middle text-center mb-4">
            <div className="col col-start">
              <FaChevronLeft className="on-hover" onClick={prevMonth} />
            </div>
            <div className="col col-center font-weight-bold ">
              {format(currentMonth, "MMMM")}
            </div>
            <div className="col col-end">
              <FaChevronRight className="on-hover" onClick={nextMonth} />
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

  useEffect(() => {
    getEvents(events => {
      setEvents(
        events.sort(function (a, b) {
          return new Date(a.start) - new Date(b.start)
        })
      )
    })
  }, [])

  return (
    <>
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-sm-10 col-md-8">
          <div className="container-fluid">
            <div className="row justify-content-center my-2">
              <p style={{ fontSize: "1.3em", fontWeight: "bold" }}>
                UPCOMING EVENTS
              </p>
            </div>
            {events.map((event, i) => {
              return (
                <>
                  <div class="card-header border">
                    <button
                      style={{ color: "black" }}
                      class="btn btn-link w-100 event-btn"
                      type="button"
                      data-toggle="collapse"
                      data-target={"#collapse" + i}
                    >
                      {event.title} | {format(new Date(event.start), "Pp")}
                    </button>
                  </div>
                  <div class="collapse border" id={"collapse" + i}>
                    <div class="card-body event p-0 m-0">
                      <div
                        class={`font-weight-bold w-100 m-0 event-header ${
                          i % 3 == 0
                            ? "event-bg-1"
                            : i % 3 == 1
                            ? "event-bg-2"
                            : "event-bg-3"
                        }`}
                      >
                        <div class="overlay pt-2 h-100 align-items-center">
                          <p className="font-weight-bold">{event.title.toUpperCase()}</p>
                        </div>
                      </div>
                      <div className="event-content px-3">
                      <p>
                        <span class="font-weight-bold">Time: </span>
                        {format(new Date(event.start), "Pp")}-{format(new Date(event.end), "p")}
                      </p>
                      <p className={event.location ? "" : "d-none"}>
                        <span class="font-weight-bold">Location: </span>
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
                      <p className={event.description ? "" : "d-none"}>{event.description}</p>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

const Calendar = props => {
  const width = useWindowSize()

  if (width > 800) {
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
