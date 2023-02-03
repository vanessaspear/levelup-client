import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.title} by {event.gamer.full_name}</div>
                        <div className="event__players">{event.game.num_players} players needed</div>
                        <div className="event__skillLevel">Skill level is {event.game.skill_level}</div>
                        <div>(1 = easy, 2 = medium, 3 = hard)</div>
                    </section>
                })
            }
        </article>
    )
}