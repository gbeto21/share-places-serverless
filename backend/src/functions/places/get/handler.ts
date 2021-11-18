import 'source-map-support/register';
import { getPlaces } from "../../../businessLogic/places";
import { createLogger } from "../../../utils/logger";
import { getToken } from 'src/utils/auth/auth';

const logger = createLogger('Handler logger')

const handler: any = async (event) => {

  try {
    const jwtToken = getToken(event)
    console.log("Token get places: ", jwtToken);

    let places = []
    if (jwtToken) {
      places = await getPlaces(jwtToken)
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
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

export const main = handler;