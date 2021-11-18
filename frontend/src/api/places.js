import Axios from "axios";
import config from "../Config.json";

const baseURL = config.baseURL

async function SayHello(token) {
    const responseHello = await Axios.get(
        `${baseURL}/hello`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    console.log("Hello response: ", responseHello.data);
}

export async function getPlaces(token) {

    console.log("Token to get places: ", token);
    SayHello(token)
    const response = await Axios.get(
        `${baseURL}/places`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

    console.log("Places: ", response.data.places);
    return response.data.places
}

export async function getPlace(token, idPlace) {
    const response = await Axios.get(
        `${baseURL}/places/${idPlace}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

    console.log("Place on api: ", response.data);
    return response.data
}

export async function createPlace(token, newPlace) {
    const response = await Axios.post(
        `${baseURL}/places`,
        JSON.stringify(newPlace),
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return response.data.place
}

export async function updatePlace(token, updatedPlace) {
    const response = await Axios.put(
        `${baseURL}/places/${updatedPlace.placeId}`,
        JSON.stringify(updatedPlace),
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return response.data
}

export async function deletePlace(token, idPlace) {
    const response = await Axios.delete(
        `${baseURL}/places/${idPlace}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return response.data
}

export async function getSignedUrl(token, idPlace) {
    const response = await Axios.get(
        `${baseURL}/signedUrl/${idPlace}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    console.log("Signed URL: ", response.data.uploadUrl);
    return response.data.uploadUrl
}

export async function uploadFile(url, file) {

    await Axios.put(url, file)

}