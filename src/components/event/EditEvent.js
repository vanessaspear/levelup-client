import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGames } from "../../managers/GameManager.js"
import { getSingleEvent, updateEvent } from "../../managers/EventManager.js"

export const EditEventForm = () => {
    const {eventId} = useParams()
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const [newEvent, setNewEvent] = useState({
        title: "",
        datetime: 0,
        address: "",
        game: {
            id: 0
        }
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
        
    useEffect(
        () => {
            getSingleEvent(eventId)
                .then( event => {
                    setNewEvent(event)
                })
        },
        [eventId]
    )

    const changeEventState = (event) => {
        let copy = {...newEvent}
        copy[event.target.name] = event.target.value
        setNewEvent(copy)
    }

    const changeGameId = (event) => {
        let copy = {...newEvent}
        copy.game.id = event.target.value
        setNewEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Update Event Information</h2>
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
                    <select name="gameId" onChange={changeGameId} value={newEvent.game.id}>
                        {
                            games.map(game => {
                                return <option value={parseInt(game.id)} key={game.id}>
                                        {game.title}
                                    </option> 
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
                        game: parseInt(newEvent.game.id),
                        datetime: newEvent.datetime
                    }

                    updateEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}