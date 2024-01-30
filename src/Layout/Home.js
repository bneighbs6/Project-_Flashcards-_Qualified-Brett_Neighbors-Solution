import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import {listDecks} from "../utils/api/index.js";

function Home() {
    const history = useHistory();
  return (
    <>
        <div class="button">
            <button type="button" class="btn btn-secondary">+ Create Deck</button>
        </div>
        <div class="decks">
            Need to list decks here
        </div>
    </>
  )
}

export default Home; 
