import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGameTypes, getSingleGame, updateGame } from '../../managers/GameManager.js'

export const EditGameForm = () => {
    const {gameId} = useParams()
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    const [currentGame, setCurrentGame] = useState({
        skill_level: 0,
        minimum_players: 0,
        maximum_players: 0,
        title: "",
        maker: "",
        type: 0
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

    useEffect(
        () => {
            getSingleGame(gameId)
                .then( game => {
                    setCurrentGame(game)
                })
        },
        [gameId]
    )

    const changeGameState = (event) => {
        let copy = {...currentGame}
        copy[event.target.name] = event.target.value
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game Information</h2>
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
                    <input type="number" name="minimum_players" className="form-control" min="1" max="100000"
                        value={parseInt(currentGame.minimum_players)}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="maximumPlayers">Maximum Players: </label>
                    <input type="number" name="maximum_players" className="form-control" min="1" max="100000"
                        value={parseInt(currentGame.maximum_players)}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level (1 = easy, 2 = medium, 3 = advanced): </label>
                    <input type="number" name="skill_level" className="form-control" min="1" max="3"
                        value={parseInt(currentGame.skill_level)}
                        onChange={changeGameState}
                    />
                </div>
                <div className="field">
                    <label htmlFor="gameType" className="label">Game Categories: </label>
                    <select name="type" onChange={changeGameState} value={currentGame.type}>
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
                        id: currentGame.id,
                        maker: currentGame.maker,
                        title: currentGame.title,
                        minimum_players: parseInt(currentGame.minimum_players),
                        maximum_players: parseInt(currentGame.maximum_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: parseInt(currentGame.type)
                    }

                    updateGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}