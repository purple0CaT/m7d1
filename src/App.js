import { Route, Link, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SearchPage from "./components/search/SearchPage";

function App() {
  const [Search, setSearch] = useState("");

  useEffect(() => {}, [Search]);
  return (
    <Router className="main">
      <Navbar setSearch={(val) => setSearch(val)} search={Search} />
      <Switch>
        <Route path="/" exact />
        <Route
          path="/search"
          exact
          render={(props) => <SearchPage searchQuery={Search} />}
        />
        <Route path="/company-detail/:id" exact />
        <Route
          render={() => (
            <>
              <br />
              <br />
              <h1 className="text-danger text-center m-5 p-5">
                404 - NOT FOUND
              </h1>
              <br />
            </>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
