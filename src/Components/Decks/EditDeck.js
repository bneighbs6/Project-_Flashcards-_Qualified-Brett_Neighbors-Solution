import { Link, useParams, useHistory } from "react-router-dom"
import React, { useState, useEffect } from "react";
import { readDeck, updateDeck } from "../../utils/api"

export default function EditDeck() {
    const history = useHistory();
    const {deckId} = useParams();
    const [deck, setDeck] = useState({cards: []});
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
   const handleNameChange = (e) => setName(e.target.value);
   const handleDescriptionChange = (e) => setDescription(e.target.value);


    const loadDeck = () => {
      readDeck(deckId).then(setDeck)
      setName(deck.name)
      setDescription(deck.description)
    }

    useEffect(() => {
       loadDeck()
     }, [deckId]);

     const handleSubmit = (e) => {
       e.preventDefault();
       const updatedDeck = {
           "id": deckId,
           "name": name,
           "description": description
       }
       updateDeck(updatedDeck).then(() => history.push(`/decks/${deckId}`))
     }

     const handleCancel = () => {
       history.push(`/decks/${deckId}`)
       }
       

            return  (
            <>
                <div className="breadcrumbs">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span> Home</Link></li>
                            <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Edit</li>
                        </ol>
                    </nav>
                </div>
                <h1>Edit Deck</h1>
                <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input 
                            id="name"
                            type="text" 
                            name="name"
                            className="form-control" 
                            onChange={handleNameChange}
                            value={name}
                            placeholder={deck.name}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea 
                            className="form-control" 
                            id="description"
                            type="text"
                            name="description" 
                            rows="3" 
                            onChange={handleDescriptionChange}
                            value={description}
                            placeholder={deck.description}>
                            </textarea>
                        </div>
                        <button type="button" className="btn btn-secondary mr-2" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="btn btn-primary mr-2" >Submit</button>
                    </form>

            </>
                )
}   