import * as React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"

import "../styles/index.css"
import App from "./containers/App"

import registerServiceWorker from "./registerServiceWorker"

import reducers from "./store/reducers"

const store = createStore(combineReducers(reducers), applyMiddleware(thunk))

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root") as HTMLElement
)

registerServiceWorker()