import { Link, useParams } from "react-router-dom"
import React, { useState, useEffect } from "react";
import { readDeck } from "../../utils/api"
import Form from "./Form";

export default function EditCard() {
  const {deckId, cardId } = useParams();
  const [deck, setDeck] = useState({cards: []});
  const [card, setCard] = useState(null);

  useEffect(() => {
    async function loadCard() {
      const response = await readDeck(deckId);
      if (response.ok) {
        const deck = await response.json();
        const card = deck.cards.find((c) => c.id === parseInt(cardId));
        if (card) {
          setCard(card);
          setDeck(deck);
        } else {
          setCard(null);
          setDeck({cards: []});
        }
      } else {
        setCard(null);
        setDeck({cards: []});
      }
    }
    loadCard();
    // eslint-disable-next-line 
  }, [deckId, cardId]);

  return (
    <>
      {!card && <p>Error: Card not found</p>}
      {card && (
        <>
          <div className="breacrumbs">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span> Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
              </ol>
            </nav>
          </div>
          <h1>Edit Card</h1>
          <Form card={card} submitting="edit card" deck={deck}/>
        </>
      )}
    </>
  )
}