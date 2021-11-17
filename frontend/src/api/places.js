import Axios from "axios";

const baseURL = "http://localhost:4000/dev"

export async function getPlaces(token) {

    console.log("Token to get places: ", token);
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