import 'source-map-support/register'
import { postPlace } from "../../../businessLogic/places";
import { createLogger } from "../../../utils/logger";
import { PostPlaceRequest } from 'src/requests/PostPlaceRequest';
import { getToken } from 'src/utils/auth/auth';

const logger = createLogger('Handler logger')

const handler: any = async (event) => {

    try {

        logger.info("Event body received: ", event.body)
        const parsedPlace: PostPlaceRequest = JSON.parse(event.body)
        logger.info("Event body parced: ", parsedPlace)
        const jwtToken = getToken(event)
        const place = await postPlace(jwtToken, parsedPlace)
        logger.info('Place created', place)
        return {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({
                place
            })
        }

    } catch (error) {
        console.error(error);
        logger.error(error)
        return {
            statusCode: 500,
            message: "Internal server error."
        }
    }
}

export const main = handler