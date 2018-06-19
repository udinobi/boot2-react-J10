import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import App from "./components/App"

import store from "./store/store"

// css files from node_modules
import "./style/include.css"

import "./style/style"

import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(
  <Provider store={store}>
        <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
)
registerServiceWorker()
