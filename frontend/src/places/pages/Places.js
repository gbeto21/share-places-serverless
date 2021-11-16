import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { getPlaces } from "../../api/places";
import PlaceList from '../components/PlaceList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useParams } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'

const Places = () => {

    const [loadedPlaces, setLoadedPlaces] = useState()
    const { isAuthenticated, getIdTokenClaims } = useAuth0()
    useEffect(() => {
        const fetchPlaces = async () => {

            if (isAuthenticated) {
                const idToken = await getIdTokenClaims()
                const places = await getPlaces(idToken.__raw)
                setLoadedPlaces(places)
            }
        }

        fetchPlaces()
    },[])
    // const { isLoading, error, sendRequest, clearError } = useHttpClient()
    // const userId = useParams().userId

    // useEffect(() => {
    //     const fetchPlaces = async () => {
    //         try {
    //             const responseData = await sendRequest(
    //                 `${process.env.REACT_APP_URL}places/user/${userId}`
    //             )
    //             setLoadedPlaces(responseData.places)
    //         } catch (error) { }
    //     }
    //     fetchPlaces()
    // }, [sendRequest, userId])

    // const placeDeletedHandler = deletedPlaceId => {
    //     setLoadedPlaces(
    //         prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId)
    //     )
    // }

    return <React.Fragment>

        {!isAuthenticated &&
            <h3>Please login for view the places.</h3>
        }

        {
            loadedPlaces &&
            (
                <PlaceList
                    items={loadedPlaces}
                // onDeletePlace={placeDeletedHandler} 
                />
            )
        }
    </React.Fragment>
}

export default Places