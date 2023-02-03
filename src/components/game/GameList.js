import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.num_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}. (1 = easy, 2 = medium, 3 = hard)</div>
                    </section>
                })
            }
        </article>
    )
}