/** TO-DO 
 * still have to add delete card to the deleteCard button
*/

import { Link, useParams, useHistory } from "react-router-dom"
import React, { useState, useEffect } from "react";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api"

export default function ViewDeck() {
    const history = useHistory();
    const {deckId} = useParams();
    const [deck, setDeck] = useState({cards: []});

    const deleteDeckHandler = (deckId) => {
      const result = window.confirm(
        "Delete this deck?\n\nYou will not be able to recover it."
    )
    if (result) {
      deleteDeck(deckId).then(history.push("/"))
    }
    }

    const deleteCardHandler = (cardId) => {
      const result = window.confirm(
        "Delete this card?\n\nYou will not be able to recover it."
    )
    if (result) {
      deleteCard(cardId)
      readDeck(deckId).then(setDeck);
    }
    }

    const loadDeck = () => {
      readDeck(deckId).then(setDeck)
    }
  
    useEffect(() => {
        loadDeck()

      // eslint-disable-next-line
      }, [deckId]);

    return (
        <>
        <div className="breacrumbs">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span> Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
        </div>
        <div className=" mb-3">
           <div className="card-body">
             <div className="row">
               <div className="col">
                 <h4 className="card-title">{deck.name}</h4>
               </div>
             </div>
             <p className="card-text">
               {deck.description}
             </p>
             <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary mr-2"><span className="oi oi-pencil"></span> Edit</Link>
             <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2"> <span className="oi oi-book"></span> Study</Link>
             <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary"><span className="oi oi-plus"></span> Add Cards</Link>
             <button type="button" className="btn btn-danger float-right" onClick={() => deleteDeckHandler(deck.id)} ><span className="oi oi-trash"></span></button>
           </div>
         </div>
        <h1>Cards</h1>
             {deck.cards.map((card, index) => (
                        <div key={index} className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                            </div>
                            <div className="row">
                                <p className="card-text col">
                                    {card.front}
                                </p>
                                <p className="card-text col">
                                    {card.back}
                                </p>
                            </div>
                            <button type="button" className="btn btn-danger float-right" onClick={() => deleteCardHandler(card.id)} ><span className="oi oi-trash"></span></button>
                            <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-secondary mr-2 float-right"><span className="oi oi-pencil"></span> Edit</Link>
                        </div>
                        </div>
             ))}
            </>
    )
}