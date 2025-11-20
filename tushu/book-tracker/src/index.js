import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, compose, combineReducers } from "redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";

import booksReducer from "./store/reducers/books";
import wishListReducer from "./store/reducers/wishList";

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
/* eslint-enable */
const rootReducer = combineReducers({
  books: booksReducer,
  wishList: wishListReducer,
});
const store = createStore(rootReducer, composeEnhancers());

const theme = createMuiTheme({
  palette: {
    type: true ? "dark" : "light",
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

registerServiceWorker();
