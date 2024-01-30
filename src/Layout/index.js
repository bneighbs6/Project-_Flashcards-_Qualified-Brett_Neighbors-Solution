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
          <Route path="/">
            <Home path="/" />
          </Route>
          
          <NotFound />
        </Router>
          
      </div>
    </>
  );
}

export default Layout;

