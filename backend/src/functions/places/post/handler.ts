import 'source-map-support/register'
import { middyfy } from '@libs/lambda'
import { postPlace } from "../../../businessLogic/places";
import { createLogger } from "../../../utils/logger";
import { PostPlaceRequest } from 'src/requests/PostPlaceRequest';

const logger = createLogger('Handler logger')

const handler: any = async (event) => {

    try {
        
        const parsedPlace: PostPlaceRequest = event.body
        const place = await postPlace('userId', parsedPlace)
        logger.info('Place created', place)
        return {
            statusCode: 201,
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

export const main = middyfy(handler)