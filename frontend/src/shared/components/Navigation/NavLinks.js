import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../context/auth-context'
import './NavLinks.css'

import { useAuth0 } from "@auth0/auth0-react";

const NavLinks = props => {

    const { loginWithRedirect, logout, isAuthenticated } = useAuth0()
    const auth = useContext(AuthContext)

    return <ul className="nav-links">
        {auth.isLoggedIn &&
            <li>
                <NavLink to="/places/new">ADD PLACE</NavLink>
            </li>
        }

        {!isAuthenticated &&
            <li>
                <button onClick={() => loginWithRedirect()}>
                    LOGIN
                </button>
            </li>
        }
        {isAuthenticated &&
            <li>
                <button onClick={() => logout()}>LOGOUT</button>
            </li>
        }
    </ul>

}

export default NavLinks