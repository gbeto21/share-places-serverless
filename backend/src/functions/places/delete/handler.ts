import 'source-map-support'
import { middyfy } from "@libs/lambda";

const deletePlace: any = async (event) => {

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hi from delete place.'
        })
    }
}

export const main = middyfy(deletePlace)