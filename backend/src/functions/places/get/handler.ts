import 'source-map-support/register';
import { middyfy } from '@libs/lambda';

const getPlaces: any = async (event) => {
  const places = []
  return {
    statusCode: 201,
    body: JSON.stringify({ places })
  }
}

export const main = middyfy(getPlaces);