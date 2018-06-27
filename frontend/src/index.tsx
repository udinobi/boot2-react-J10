import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"

import App from "./components/App"

import store from "./store/store"

// css files from node_modules
import "./style/include.css"

import "./style/style"

import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root") as HTMLElement
)

registerServiceWorker()
