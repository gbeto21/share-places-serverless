import * as AWS from 'aws-sdk'
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { createLogger } from '../utils/logger'
import { Place } from "../models/Place";
import { PutPlaceRequest } from 'src/requests/PutPlaceRequest';

const logger = createLogger('TodosAccess')

export class PlacesAccess {
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

    async postPlace(place: Place): Promise<Place> {
        await this.docClient
            .put({
                TableName: this.placesTable,
                Item: place
            })
            .promise()
        return place
    }

    async putPlace(
        userId: string,
        placeId: string,
        placeParse: PutPlaceRequest
    ) {
        let result = {
            statusCode: 200,
            body: ''
        }

        let placeToBeUpdate = await this.docClient
            .query({
                TableName: this.placesTable,
                KeyConditionExpression: 'userId = :userId AND placeId = :placeId',
                ExpressionAttributeValues: {
                    ':userId': userId,
                    ':placeId': placeId
                }
            })
            .promise()

        logger.info('Place to be upated', placeToBeUpdate)

        if (placeToBeUpdate.Items.length === 0) {
            result = {
                statusCode: 404,
                body: 'The place to be upate was not found'
            }
            return result
        }

        await this.docClient
            .update({
                TableName: this.placesTable,
                Key: {
                    userId,
                    placeId
                },
                UpdateExpression: 'set #name =:name, #description =:description',
                ExpressionAttributeValues: {
                    ':name': placeParse.name,
                    ':description': placeParse.description
                },
                ExpressionAttributeNames: {
                    '#name': 'name',
                    '#description': 'description'
                },
                ReturnValues: 'UPDATED_NEW'
            })
            .promise()

        return result
    }

    async deletePlace(userId: string, placeId: string) {
        let result = {
            statusCode: 200,
            body: ''
        }

        let placeToBeDeleted = await this.docClient
            .query({
                TableName: this.placesTable,
                KeyConditionExpression: 'userId = :userId AND placeId = :placeId',
                ExpressionAttributeValues: {
                    ':userId': userId,
                    ':placeId': placeId
                }
            })
            .promise()

        if (placeToBeDeleted.Items.length === 0) {
            result.statusCode = 404
            result.body = 'The place to be deleted was not found.'
        }

        await this.docClient
            .delete({
                TableName: this.placesTable,
                Key: {
                    userId,
                    placeId
                }
            })
            .promise()

        //TODO: Implement this logic.
        // await this.s3
        //     .deleteObject({
        //         Bucket: this.s3Bucket,
        //         Key: placeId
        //     })
        //     .promise()

        return result
    }

    async generateUploadURL(userId, placeId) {
        let result = {
            statusCode: 201,
            body: ''
        }

        let checkIfExist = await this.docClient
            .query({
                TableName: this.placesTable,
                KeyConditionExpression: 'userId = :userId AND placeId = :placeId',
                ExpressionAttributeValues: {
                    ':userId': userId,
                    ':placeId': placeId
                }
            })
            .promise()

        if (checkIfExist.Items.length === 0) {
            result = {
                statusCode: 404,
                body: 'The place to be update was not found'
            }
            return result
        }

        console.log("Updating the place.");

        await this.docClient
            .update({
                TableName: this.placesTable,
                Key: {
                    userId,
                    placeId
                },
                UpdateExpression: 'set #imageUrl =:imageUrl',
                ExpressionAttributeValues: {
                    ':imageUrl': `https://${this.s3Bucket}.s3.amazonaws.com/${placeId}`
                },
                ExpressionAttributeNames: { '#imageUrl': 'imageUrl' },
                ReturnValues: 'ALL_OLD'
            })
            .promise()

        console.log("Generating the signedURL");

        result.body = this.s3.getSignedUrl('putObject', {
            Bucket: this.s3Bucket,
            Key: placeId,
            Expires: parseInt(this.urlExpiration)
        })

        return result

    }

}

function createDynamoDBClient(): AWS.DynamoDB.DocumentClient {
    if (process.env.IS_OFFLINE) {
        logger.info('Creating a local DynamoDB instance')
        return new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000'
        })
    }

    return new AWS.DynamoDB.DocumentClient()
}