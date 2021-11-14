import * as AWS from 'aws-sdk'
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { createLogger } from '../utils/logger'
import { Place } from "../models/Place";

const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger('TodosAccess')

export class PlacesAcces {
    constructor(private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly placesTable = process.env.PLACE_TABLE,
        private readonly s3 = new AWS.S3({ signatureVersion: 'v4' }),
        private readonly s3Bucket = process.env.ATTACHMENT_S3_BUCKET,
        private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION) { }

    async getPlaces(userId): Promise<Place[]> {
        const result = await this.docClient
            .query({
                TableName: this.placesTable,
                KeyConditionExpression: "userId = :userId",
                ExpressionAttributeValues: {
                    ':userId': userId
                }
            })
            .promise()
        logger.info('Result', result)
        const places = result.Items
        return places as Place[]
    }

}

function createDynamoDBClient(): AWS.DynamoDB.DocumentClient {
    if (process.env.IS_OFFLINE) {
        logger.info('Creating a local DynamoDB instance')
        return new XAWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000'
        })
    }

    return new XAWS.DynamoDB.DocumentClient()
}