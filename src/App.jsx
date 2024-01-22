import React, { useReducer } from "react";
import Login from "./Login";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import Dashboard from "./Dashboard";
import ProductsList from "./ProductsList";
import { HashRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import NavBar from "./NavBar";
import { UserContext } from "./UserContext";
import Store from "./Store";

let initialUser = {
  isLoggedIn: false,
  currentUserId: null,
  currentUserName: null,
  currentUserRole: null,
};

//reducer: operations on "user" state
let reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        isLoggedIn: true,
        currentUserId: action.payload.currentUserId,
        currentUserName: action.payload.currentUserName,
        currentUserRole: action.payload.currentUserRole,
      };
    case "logout":
      return {
        isLoggedIn: false,
        currentUserId: null,
        currentUserName: null,
        currentUserRole: null,
      };
    default:
      return state;
  }
};

function App() {
  //useReducer: state + operation
  let [user, dispatch] = useReducer(reducer, initialUser);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <HashRouter>
        <NavBar />
        <div className="container-fluid">
          <Switch>
            <Route path="/" exact={true} component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/store" component={Store} />
            <Route path="/products" component={ProductsList} />
            <Route path="*" component={NoMatchPage} />
          </Switch>
        </div>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;
