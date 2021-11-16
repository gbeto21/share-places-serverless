import Axios from "axios";

const baseURL = "http://localhost:4000/dev"

export async function getPlaces(token) {

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