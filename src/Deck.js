import React, {useState, useEffect} from "react";
import Card from "./Card.js"
import axios from "axios"
import {v4 as uuid} from "uuid"
import "./Deck.css"
function Deck(){
    const [cards, setCards] = useState([])
    const[deck, setDeck] = useState(null)
    const [isShuffling, setIsShuffling] = useState(false)
    const getCard = async () => {
            let newCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
            if(newCard.data.remaining > 0){
                setCards([...cards, {
                    value: newCard.data.cards[0].value,
                    suit: newCard.data.cards[0].value,
                    image: newCard.data.cards[0].image
                }])   
            }
        else{
            alert("no card remaining!")
        }
    }

    const shuffle = () => setIsShuffling(true)

    useEffect(function shuffleDeck(){
        async function doShuffle(){
            if (isShuffling){
                setCards([])
                axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`)
                setTimeout(()=> setIsShuffling(false), 1000)  
            }
        }
        doShuffle()
    }, [isShuffling])


    useEffect(function newDeck(){
        async function getDeck(){
            setCards([])
            let freshDeck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            setDeck(freshDeck.data)
            
        }
        getDeck()
        
    }, [])
    return(
        <>
            {isShuffling ? <button disabled>Get a new Card</button> :
             <button onClick={getCard}>Get a new card</button>}
           
            {isShuffling ? <button disabled>Shuffling...</button> :
            <button onClick={shuffle}>Shuffle deck</button>}

            {cards.map(card => <Card key = {uuid()} suit= {card.suit} value = {card.value} image = {card.image}/>)}
        </>
        
    )
}

export default Deck;