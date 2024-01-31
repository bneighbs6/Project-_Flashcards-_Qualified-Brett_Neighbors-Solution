import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import Home from "../Components/Home";
import ViewDeck from "../Components/Decks/ViewDeck"
import EditDeck from "../Components/Decks/EditDeck"
import CreateDeck from "../Components/Decks/CreateDeck"
import Study from "../Components/Decks/Study"
import AddCard from "../Components/Cards/AddCard"
import EditCard from "../Components/Cards/EditCard"


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>

          <Route exact path="/">
            <Home />
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

          <Route exact path="/decks/:deckId">
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
        </Switch>
      </div>
    </>
  );
}

export default Layout;

