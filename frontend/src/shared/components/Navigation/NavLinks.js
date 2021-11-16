import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import './NavLinks.css'

const NavLinks = props => {

    const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

    return <ul className="nav-links">
        {isAuthenticated &&
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