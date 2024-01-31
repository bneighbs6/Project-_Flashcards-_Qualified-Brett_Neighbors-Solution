import { Link, useParams } from "react-router-dom"
    import React, { useState, useEffect } from "react";
    import { readDeck } from "../../utils/api"
    import Form from "./Form";
    
    export default function AddCard() {
        const {deckId} = useParams();
        const [deck, setDeck] = useState({cards: []});
      
        useEffect(() => {
            readDeck(deckId).then(setDeck)

          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [deckId]);


    return (
    <>
        <div className="breacrumbs">
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span> Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Add Card</li>
            </ol>
        </nav>
        </div>
        <h1>{deck.name}: Add Card</h1>
        <Form submitting="add card" />

    </>
    )
}