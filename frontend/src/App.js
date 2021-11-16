import React, { Suspense } from 'react';
import { useAuth } from './shared/hooks/auth-hooks'
import { AuthContext } from "./shared/context/auth-context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavigation from './shared/components/Navigation/MainNavigation'
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { Auth0Provider } from "@auth0/auth0-react";
import { authSetting } from "./auth/config";
// const NewPlace = React.lazy(() => import('./places/pages/NewPlace'))
// const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'))
const Places = React.lazy(() => import('./places/pages/Places'))

function App() {

  const { token, login, logout } = useAuth()
  let routes = (
    <Routes>
      <Route path="/" element={<Places />} exact />
    </Routes>
  )

  return (
    <Auth0Provider
      domain='dev-07sod58o.us.auth0.com'
      clientId='AUddevsAFkqdnYouTabbt76PYbLkdn64'
      redirectUri={window.location.origin}
    >
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
    </Auth0Provider>
  );
}

export default App;
