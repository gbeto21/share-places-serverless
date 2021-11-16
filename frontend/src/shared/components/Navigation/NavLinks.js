import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../context/auth-context'
import './NavLinks.css'

const NavLinks = props => {

    const auth = useContext(AuthContext)

    return <ul className="nav-links">
        {auth.isLoggedIn && (<li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>)}
        {!auth.isLoggedIn && (<li>
            <button>LOGIN</button>
        </li>)}
        {auth.isLoggedIn &&
            <li>
                <button onClick={auth.logout}>LOGOUT</button>
            </li>}
    </ul>

}

export default NavLinks