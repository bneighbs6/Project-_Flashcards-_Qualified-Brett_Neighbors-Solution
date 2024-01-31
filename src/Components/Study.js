import { Link, useParams, useHistory } from "react-router-dom"
import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api"

export default function StudyDeck() {
    const history = useHistory();
    const {deckId} = useParams();
    const [deck, setDeck] = useState({cards: []});
    const [frontSide, setFrontSide] = useState(true)
    const [cards, setCards] = useState([]);
    const [index, setIndex] = useState(0)

    const flipHandler = () => {
        setFrontSide(!frontSide)
    }

    const nextHandler = () => {
        if (index === cards.length - 1) {
            const restart = window.confirm(
                "Restart cards? Click 'cancel' to return to the home page."
            )
            if (restart) {
                // why did I have to set the index to -1?
                setIndex(-1)
                setFrontSide(true)
            } else {
                history.push("/");
            }
        }

        setIndex((index) => index + 1)
        setFrontSide(true)
    }

    const loadDeck = () => {
       
        readDeck(deckId).then((deck) => {
            setDeck(deck);
            setCards(deck.cards)
        })
      }
  
    useEffect(() => {
        loadDeck();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [deckId]);

    if (cards.length <= 2) {
        return (
            <>
            <div className="breadcrumbs">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span> Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Study</li>
                    </ol>
                </nav>
            </div>
            <h1>{deck.name}: Study</h1>
            <h2>Not enough cards.</h2>
            <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
            <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary"><span className="oi oi-plus"></span> Add Cards</Link>
            </>
        )
    }


    return (
        <>
        <div className="breadcrumbs">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span> Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
        </div>
        <h1>Study: {deck.name}</h1>

                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <h5 className="card-title">Card {index + 1} of {cards.length}</h5>
                                </div>
                            </div>
                            <p className="card-text">
                            {frontSide ? cards[index].front : cards[index].back}
                            </p>
                            <button type="button" className="btn btn-secondary mr-2" onClick={flipHandler} >Flip</button>
                            {frontSide === false && <button type="button" className="btn btn-primary" onClick={nextHandler} >Next</button>}
                        </div>
                    </div>
            </>
    )
}