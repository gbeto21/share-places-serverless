import 'source-map-support'
import { middyfy } from '@libs/lambda'

const putPlace: any = async (event) => {

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hi from put place.'
        })
    }
}

export const main = middyfy(putPlace)