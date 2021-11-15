import 'source-map-support'
import { middyfy } from "@libs/lambda";
import { deletePlace } from 'src/businessLogic/places';
import { createLogger } from "../../../utils/logger";
import { getToken } from 'src/utils/auth/auth';

const logger = createLogger('Put place logger')

const handler: any = async (event) => {

    try {

        logger.info('Getting place to be updated: ', { event })

        const placeId = event.pathParameters.placeId
        logger.info('Place id: ', placeId)

        const jwtToken = getToken(event)
        const result = await deletePlace(jwtToken, placeId)
        logger.info('Place updated', result)

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