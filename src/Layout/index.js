import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom/cjs/react-router-dom.min";
import Study from "../Components/Decks/Study";
import CreateDeck from "../Components/Decks/CreateDeck"
import ViewDeck from "../Components/Decks/ViewDeck";
import EditDeck from "../Components/Decks/EditDeck";
import AddCard from "../Components/Cards/AddCard";
import EditCard from "../Components/Cards/EditCard"

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Router>
          
          <Route exact path="/">
            <Home  />
          </Route>

          <Route exact path="/decks">
            <Home />
          </Route>
          
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          
          <Route path="/decks/new">
            <CreateDeck />
          </Route>

          <Route path="/decks/:deckId">
            <ViewDeck />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard /> 
          </Route>
  
          <Route>
            <NotFound />
          </Route>
          
        </Router>
          
      </div>
    </>
  );
}

export default Layout;

