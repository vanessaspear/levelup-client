import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent } from '../../managers/EventManager.js'
import { getGames } from "../../managers/GameManager.js"

export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const [newEvent, setNewEvent] = useState({
        title: "",
        datetime: 0,
        address: "",
        gameId: 0
    })

    useEffect(
        () => {
        getGames()
            .then(games => {
                setGames(games)
            })
         }, 
        []
    )

    const changeEventState = (event) => {
        let copy = {...newEvent}
        copy[event.target.name] = event.target.value
        setNewEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={newEvent.title}
                        onChange={changeEventState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address: </label>
                    <input type="text" name="address" className="form-control"
                        value={newEvent.address}
                        onChange={changeEventState}
                    />
                </div>
                <div className="field">
                    <label htmlFor="gameId" className="label">Games Available: </label>
                    <select name="gameId" onChange={changeEventState}>
                        <option>Select a Game</option>
                        {
                            games.map(game => {
                                return <>
                                    <option value={parseInt(game.id)} key={parseInt(game.id)}>
                                        {game.title}
                                    </option> </>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        title: newEvent.title,
                        address: newEvent.address,
                        game: parseInt(newEvent.gameId),
                        datetime: "2023-02-19 02:30:00"
                    }

                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}