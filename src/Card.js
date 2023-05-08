import React from "react";

function Card({suit, value, image}){
    return(
        <div className="Card">
            <img alt = {`${suit}, ${value}`} src={image} width={'50px'}></img>
        </div>
    )
}

export default Card;