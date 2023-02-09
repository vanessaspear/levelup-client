import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getGames, deleteGame } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const navigate = useNavigate()

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/games/new" })
            }}
        >Register New Game</button>
        <article className="games">
            {
                games.map(game => {
                    return <>
                        <button
                            onClick={() => { 
                                deleteGame(game.id)
                                navigate(0)
                             }}
                        >Delete Game</button>
                        <section key={`game--${game.id}`} className="game">
                            <div className="game__title">{game.title} by {game.maker}</div>
                            <div className="game__players"> Minimum Players Required: {game.minimum_players}</div>
                            <div className="game__players"> Maximum Players Allowed: {game.maximum_players}</div>
                            <div className="game__skillLevel">Skill level is {game.skill_level}. (1 = easy, 2 = medium, 3 = advanced)</div>
                        </section>
                    </>
                })
            }
        </article>
    </>
    )
}