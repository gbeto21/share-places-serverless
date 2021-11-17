import 'source-map-support'
import { middyfy } from '@libs/lambda'
import { getPlace } from "../../../businessLogic/places";
import { createLogger } from "../../../utils/logger";
import { getToken } from 'src/utils/auth/auth';

const logger = createLogger('Get place logger')

const handler: any = async (event) => {

    try {

        console.log("Getting single place.");
        
        logger.info('Getting place to be founded: ', { event })

        const placeId = event.pathParameters.placeId
        logger.info('Place id: ', placeId)

        const jwtToken = getToken(event)
        const result = await getPlace(jwtToken, placeId)
        logger.info('Place founded', result)

        return {
            statusCode: result.statusCode,
            body: result.body
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