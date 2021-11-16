import React, { Suspense } from 'react';
import { useAuth } from './shared/hooks/auth-hooks'
import { AuthContext } from "./shared/context/auth-context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavigation from './shared/components/Navigation/MainNavigation'
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

// const NewPlace = React.lazy(() => import('./places/pages/NewPlace'))
// const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'))
// const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'))
const Auth = React.lazy(() => import('./user/pages/Auth'))

function App() {

  const { token, login, logout } = useAuth()
  let routes = (
    <Routes>
      <Route path="/" element={<Auth />} exact />
      <Route path="/auth" element={<Auth />} exact />
    </Routes>
  )

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout
      }}>
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Suspense fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }>
            {routes}
          </Suspense>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;