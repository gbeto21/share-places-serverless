import 'source-map-support'
import { putPlace } from "../../../businessLogic/places";
import { createLogger } from "../../../utils/logger";
import { PutPlaceRequest } from "src/requests/PutPlaceRequest";
import { getToken } from 'src/utils/auth/auth';

const logger = createLogger('Put place logger')

const handler: any = async (event) => {

    try {

        logger.info('Getting place to be updated: ', { event })

        const placeId = event.pathParameters.placeId
        logger.info('Place id: ', placeId)

        const parsePlace: PutPlaceRequest = event.body
        logger.info('Place to be updated: ', {
            parsePlace
        })

        const jwtToken = getToken(event)
        const result = await putPlace(jwtToken, placeId, parsePlace)
        logger.info('Place updated', result)

        return {
            statusCode: result.statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
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

export const main = handler