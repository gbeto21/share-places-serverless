import 'source-map-support'
import { middyfy } from '@libs/lambda'

const getSignedUrl: any = async (event) => {

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hi from get signedUrl'
        })
    }
}

export const main = middyfy(getSignedUrl)