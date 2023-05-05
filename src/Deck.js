import React, {useState, useEffect} from "react";
import Card from "./Card.js"
import {v4 as uuid} from "uuid"
function Deck(){
    const [cards, setCards] = useState([])

    return(
        <>
        {cards.map(card => <Card suit= {card.suit} value = {card.value} image = {card.image}/>)}
        </>
        
    )
}

export default Deck;