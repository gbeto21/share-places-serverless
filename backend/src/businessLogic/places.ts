import { PlacesAccess } from "../dataLayer/placesAccess";
import { Place } from "../models/Place";
import { createLogger } from "../utils/logger";
import { v4 as uuidv4 } from 'uuid';
import { PostPlaceRequest } from "src/requests/PostPlaceRequest";
import { PutPlaceRequest } from "src/requests/PutPlaceRequest";

const logger = createLogger('places')
const placesAccess = new PlacesAccess()

export async function getPlaces(pJWT: string): Promise<Place[]> {
    // const userId = parseUserId(jwkToken);
    logger.info('Getting places from places logic.')
    return placesAccess.getPlaces(pJWT)
}

export async function postPlace(pJWT: string, pPlace: PostPlaceRequest) {
    const userId = pJWT
    const placeId = uuidv4()

    const place = {
        userId,
        placeId,
        ...pPlace,
        imageUrl: ''
    }

    logger.info('Place created to put', place)
    const placeResult = placesAccess.postPlace(place)
    return placeResult

}

export async function putPlace(
    jwkToken: string,
    placeId: string,
    placeBody: PutPlaceRequest) {
    const result = placesAccess.putPlace(jwkToken, placeId, placeBody)
    return result
}

export async function deletePlace(
    jwkToken: string,
    placeId: string,
) {
    const toReturn = placesAccess.deletePlace(jwkToken, placeId)

    return toReturn
}