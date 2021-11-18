import type { AWS } from '@serverless/typescript';

import { hello } from './src/functions';
import {
  getPlaces,
  getPlace,
  postPlaces,
  putPlace,
  deletePlace,
  getSignedUrl,
  auth
} from './src/functions';


const serverlessConfiguration: AWS = {
  service: 'backend',
  frameworkVersion: '2',
  package: {
    individually: true
  },
  custom: {
    region: 'us-east-1',
    stage: 'dev',
    dynamodb: {
      stages: ['${self:custom.stage}'],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true
      }
    },
    ['serverless-offline']: {
      httpPort: 4000
    },
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: [
    'serverless-webpack',
    'serverless-iam-roles-per-function',
    'serverless-offline',
    'serverless-dynamodb-local'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: '${self:custom.stage}',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PLACE_TABLE: 'Place-${self:custom.stage}',
      ATTACHMENT_S3_BUCKET: 'places-${self:custom.stage}',
      SIGNED_URL_EXPIRATION: '650',
      TABLE_THROUGHPUT: '1'
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    hello,
    auth,
    getPlaces,
    getPlace,
    postPlaces,
    putPlace,
    deletePlace,
    getSignedUrl
  },
  resources: {
    Resources: {
      PlaceTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:provider.environment.PLACE_TABLE}',
          AttributeDefinitions: [
            { AttributeName: 'userId', AttributeType: 'S' },
            { AttributeName: 'placeId', AttributeType: 'S' },
          ],
          KeySchema: [
            { AttributeName: 'userId', KeyType: 'HASH' },
            { AttributeName: 'placeId', KeyType: 'RANGE' }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: '${self:provider.environment.TABLE_THROUGHPUT}',
            WriteCapacityUnits: '${self:provider.environment.TABLE_THROUGHPUT}'
          }
        }
      }
    }
  }
}

module.exports = serverlessConfiguration;
