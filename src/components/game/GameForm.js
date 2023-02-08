import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 0,
        minimumPlayers: 0,
        maximumPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(
        () => {
        getGameTypes()
            .then(gameTypes => {
                setGameTypes(gameTypes)
            })
         }, 
        []
    )

    const changeGameState = (event) => {
        let copy = {...currentGame}
        copy[event.target.name] = event.target.value
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="minimumPlayers">Minimum Number of Players: </label>
                    <input type="number" name="minimumPlayers" className="form-control" min="1" max="100000"
                        value={parseInt(currentGame.minimumPlayers)}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="maximumPlayers">Maximum Players: </label>
                    <input type="number" name="maximumPlayers" className="form-control" min="1" max="100000"
                        value={parseInt(currentGame.maximumPlayers)}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level (1 = easy, 2 = medium, 3 = advanced): </label>
                    <input type="number" name="skillLevel" className="form-control" min="1" max="3"
                        value={parseInt(currentGame.skillLevel)}
                        onChange={changeGameState}
                    />
                </div>
                <div className="field">
                    <label htmlFor="gameType" className="label">Game Categories: </label>
                    <select name="gameTypeId" onChange={changeGameState}>
                        <option>Select a category</option>
                        {
                            gameTypes.map(type => {
                                return <>
                                    <option value={parseInt(type.id)} key={parseInt(type.id)}>
                                        {type.label}
                                    </option> </>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        minimum_players: parseInt(currentGame.minimumPlayers),
                        maximum_players: parseInt(currentGame.maximumPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}