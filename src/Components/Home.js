import React, { useState,useEffect } from "react";
import { listDecks,deleteDeck } from "../utils/api";
import { Link } from "react-router-dom";

export default function Home() {
     const [decks, setDecks] = useState([]);

  const deleteDeckHandler = (deckId) => {
    const result = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
  )
  if (result) {
    deleteDeck(deckId).then(loadDecks())
  }
  }

  const loadDecks = () => {
    listDecks().then(setDecks)
  }

  useEffect(() => {
    loadDecks()

  }, []);

  return (
    <>
      <Link to="/decks/new" className="btn btn-secondary mb-3">
      <span className="oi oi-plus"></span> Create Deck</Link>
      {decks.map(deck => (
           <div className="card mb-3">
           <div className="card-body">
             <div className="row">
               <div className="col">
                 <h5 className="card-title">{deck.name}</h5>
               </div>
               <div className="col">
                 <p className="float-right">{deck.cards.length} cards</p>
               </div>
             </div>
             <p className="card-text">
               {deck.description}
             </p>
             <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2"><span className="oi oi-eye"></span> View</Link>
             <Link to={`/decks/${deck.id}/study`} className="btn btn-primary"> <span className="oi oi-book"></span> Study</Link>
             <button type="button" className="btn btn-danger float-right" onClick={() => deleteDeckHandler(deck.id)} ><span className="oi oi-trash"></span></button>
           </div>
         </div>
      ))}
    </>
  );
}