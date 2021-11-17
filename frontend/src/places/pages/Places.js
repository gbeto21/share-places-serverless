import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { getPlaces } from "../../api/places";
import PlaceList from '../components/PlaceList'

const Places = () => {

    const [loadedPlaces, setLoadedPlaces] = useState()
    const { isAuthenticated, getIdTokenClaims } = useAuth0()
    const fetchPlaces = async () => {

        if (isAuthenticated) {
            const idToken = await getIdTokenClaims()
            const places = await getPlaces(idToken.__raw)
            setLoadedPlaces(places)
        }
    }

    useEffect(() => {
        fetchPlaces()
    }, [])

    const placeDeletedHandler = deletedPlaceId => {
        fetchPlaces()
    }

    return <React.Fragment>

        {!isAuthenticated &&
            <h3>Please login for view the places.</h3>
        }

        {
            loadedPlaces &&
            (
                <PlaceList
                    items={loadedPlaces}
                    onDeletePlace={placeDeletedHandler}
                />
            )
        }
    </React.Fragment>
}

export default Places