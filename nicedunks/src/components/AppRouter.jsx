import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {routes} from '../router/router'
import MainPage from '../components/pages/MainPage/MainPage'

const AppRouter = () => {
  return (
    <div>
      <Routes>
            <Route path='/' element={<MainPage />}/>
            {routes.map(route =>
              <Route
                path={route.path}
                element={route.element}
                key={route.key}
              />
              )}
      </Routes>
    </div>
  )
}

export default AppRouter