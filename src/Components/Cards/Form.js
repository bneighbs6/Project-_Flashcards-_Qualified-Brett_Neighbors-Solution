import { useParams, useHistory } from "react-router-dom"
import React, { useState, useEffect } from "react";
import { readDeck, updateCard, readCard, createCard } from "../../utils/api"

export default function Form({ submitting,  cardName, cardDescription }) {
  const history = useHistory();
  const { cardId, deckId } = useParams();
  const [card, setCard] = useState({});
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const handleFrontChange = (e) => setFront(e.target.value);
  const handleBackChange = (e) => setBack(e.target.value);

  useEffect(() => {
    readDeck(deckId)
    if (submitting === "edit card"){
        readCard(cardId).then((card) => {
            setCard(card)
            setFront(card.front)
            setBack(card.back)
        })
    }
  // eslint-disable-next-line 
  }, [deckId]);

  useEffect(() => {
    if (cardName) {
      setFront(cardName);
    }
    if (cardDescription) {
      setBack(cardDescription);
    }
    // eslint-disable-next-line 
  }, [cardName, cardDescription]);


// Submit Button handler  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handle submit called.");

    if (submitting === "edit card") {
      const updatedCard = {
        id: cardId,
        front: front,
        back: back,
        deckId: Number(deckId),
      };

      if (front === undefined) {
        updatedCard.front = card.front;
      }

      if (back === undefined) {
        updatedCard.back = card.back;
      }

      updateCard(updatedCard).then(() => history.push(`/decks/${deckId}`));
    }

    if (submitting === "add card") {
      e.preventDefault();
      const newCard = {
        front: front,
        back: back,
        deckId: deckId,
      };

      if (front && back) {
        createCard(deckId, newCard).then(() => history.push(`/decks/${deckId}`));
      }
      
    }
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };


 // Save Button event handler 
  const handleSave = (e) => {
    e.preventDefault();

      const newCard = {
        front: front,
        back: back,
        deckId: deckId,
      };

      // if no front or back, stay on page
      if (!front || !back) {
        return;
      }

      // creates card with new info, then resets form details to empty.
      createCard(deckId, newCard).then(() => {
        setCard(null);
        setFront("");
        setBack("");
      }); 

      console.log("Handle Save called successfully")
  }

  // Done Button event handler
  // if there is no front or back, then go back to deck screen
  // if there is a front and back, create the card then go to deck screen. 

  const handleDone = (e) => {
    e.preventDefault();
    console.log("Handle done called.");
    
  
    const newCard = {
      front: front,
      back: back,
      deckId: deckId,
    };

    if (!front || !back) {
      history.push(`/decks/${deckId}`);
    }

    if (front && back) {
      createCard(deckId, newCard).then(() => history.push(`/decks/${deckId}`));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          className="form-control"
          id="front"
          type="text"
          name="front"
          rows="3"
          onChange={handleFrontChange}
          value={front}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="back" className="form-label">
          Back
        </label>
        <textarea
          className="form-control"
          id="back"
          type="text"
          name="back"
          rows="3"
          onChange={handleBackChange}
          value={back}
        ></textarea>
      </div>
      <button type="button" className="btn btn-secondary mr-2" onClick={handleCancel}>
        Cancel
      </button>
      <button type="button" className="btn btn-outline-success mr-2" onClick={handleSave}>
        Save
      </button>
      <button type="button" className="btn btn-outline-primary mr-2" onClick={handleDone}>
        Done
      </button>
      <button type="submit" className="btn btn-primary mr-2">
        Submit
      </button>
    </form>
  );
}