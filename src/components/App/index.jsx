import { Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { ReactComponent as LoaderIcon } from "@assets/icon/loader.svg"
import Login from "@feature/Login"
import MainContent from "@feature/MainContent"

import style from "./style.scss"

const App = () => {
  const routeResult = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/", element: <MainContent /> },
  ])
  return (
    <div className={style.App}>
      <Suspense fallback={<LoaderIcon />}>
        <RouterProvider router={routeResult} />
      </Suspense>
    </div>
  )
}

export default App
