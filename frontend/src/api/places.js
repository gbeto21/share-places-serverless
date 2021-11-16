import Axios from "axios";

export async function getPlaces(token) {

    const response = await Axios.get(
        `http://localhost:4000/dev/places`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

    console.log("Places: ", response.data.places);
    return response.data.places
}