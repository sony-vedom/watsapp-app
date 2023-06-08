import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import "bootstrap/dist/css/bootstrap.min.css"

import App from "@components/App"
import store from "@redux/store"

import "./index.scss"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
)
