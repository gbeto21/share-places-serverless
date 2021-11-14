import 'source-map-support/register';
import { middyfy } from '@libs/lambda';
import { getPlaces } from "../../../businessLogic/places";
import { createLogger } from "../../../utils/logger";

const logger = createLogger('Handler logger')

const handler: any = async (event) => {

  try {
    const places = getPlaces('userId')
 
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