import { PlacesAccess } from "../dataLayer/placesAccess";
import { Place } from "../models/Place";
import { createLogger } from "../utils/logger";
import { v4 as uuidv4 } from 'uuid';

const logger = createLogger('places')
const placesAccess = new PlacesAccess()

export async function getPlaces(jwkToken: string): Promise<Place[]> {
    // const userId = parseUserId(jwkToken);
    logger.info('Getting places from places logic.')
    return placesAccess.getPlaces(jwkToken)
}

uuidv4();