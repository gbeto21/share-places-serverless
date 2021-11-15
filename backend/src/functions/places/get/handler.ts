import 'source-map-support/register';
import { middyfy } from '@libs/lambda';
import { getPlaces } from "../../../businessLogic/places";
import { createLogger } from "../../../utils/logger";
import { getToken } from 'src/utils/auth/auth';

const logger = createLogger('Handler logger')

const handler: any = async (event) => {

  try {
    const jwtToken = getToken(event)
    let places = []
    if (jwtToken) {
      places = await getPlaces(jwtToken)
    }

    return {
      statusCode: 201,
      body: JSON.stringify({ places })
    }

  } catch (error) {
    logger.error(error)
    return {
      statusCode: 500,
      message: "Internal server error."
    }
  }
}

export const main = middyfy(handler);