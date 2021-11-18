import 'source-map-support'
import { generateUploadURL } from "../../../businessLogic/places";
import { createLogger } from "../../../utils/logger";
import { getToken } from 'src/utils/auth/auth';

const logger = createLogger('Generate Signed Url')

const getSignedUrl: any = async (event) => {

    try {

        logger.info('Processing generateUploadUrl Event: ', {
            event
        })

        const placeId = event.pathParameters.placeId
        logger.info('Place id: ', placeId)

        const jwtToken = getToken(event)
        const result = await generateUploadURL(jwtToken, placeId)
        logger.info('Returning url signed', result.body)

        return {
            statusCode: result.statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({
                uploadUrl: result.body
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

export const main = getSignedUrl