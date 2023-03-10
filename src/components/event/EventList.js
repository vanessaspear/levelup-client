import React, { useEffect, useState } from "react"
import { getEvents, deleteEvent, joinEvent, leaveEvent } from "../../managers/EventManager"
import { useNavigate } from "react-router-dom"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const navigate = useNavigate()

    return (<>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/events/new" })
            }}
        >Register New Event</button>
        <article className="events">
            {
                events.map(event => {
                    return <div key={`event--${event.id}`}>
                        <>
                            <section className="event">
                                <div className="event__title">{event.title} by {event.gamer.full_name}</div>
                                <div className="event__players">{event.game.num_players} players needed</div>
                                <div className="event__skillLevel">Skill level is {event.game.skill_level}</div>
                            </section>
                            {
                                event.joined ? 
                                <button
                                    onClick={() => { 
                                        leaveEvent(event.id)
                                        navigate(0)
                                    }}
                                >Remove Event</button>
                                :  <button
                                    onClick={() => { 
                                        joinEvent(event.id)
                                        navigate(0)
                                    }}
                                >Sign Up for Event</button>
                            }
                            <button
                                onClick={() => { 
                                    deleteEvent(event.id) 
                                    navigate(0)
                                }}
                            >Delete Event</button>
                        </> 
                    </div>
                })
            }
        </article>
        </>)
}