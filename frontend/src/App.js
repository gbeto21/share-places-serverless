import React, { Suspense } from 'react';
import { useAuth } from './shared/hooks/auth-hooks'
import { AuthContext } from "./shared/context/auth-context";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainNavigation from './shared/components/Navigation/MainNavigation'

// const NewPlace = React.lazy(() => import('./places/pages/NewPlace'))
// const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'))
// const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'))

function App() {

  const { token, login, logout } = useAuth()
  let routes = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainNavigation />} exact />
      </Routes>
    </BrowserRouter>
  )

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout
      }}>
      {/* <MainNavigation /> */}
      <main>
        {routes}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
