import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import { BrowserRouter as Router, Route } from "react-router-dom/cjs/react-router-dom.min";

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
            <StudyDeck />
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

