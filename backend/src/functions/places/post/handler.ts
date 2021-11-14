import 'source-map-support/register'
import { middyfy } from '@libs/lambda'

const postPlace: any = async (event) => {

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Hi from post place."
        })
    }
}

export const main = middyfy(postPlace)