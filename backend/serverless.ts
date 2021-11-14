import type { AWS } from '@serverless/typescript';

import { hello } from './src/functions';
import { getPlaces } from './src/functions';
import { postPlaces } from './src/functions';
import { putPlace } from './src/functions';
import { deletePlace } from './src/functions';
import { getSignedUrl } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'backend',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { hello, getPlaces, postPlaces, putPlace, deletePlace, getSignedUrl }
}

module.exports = serverlessConfiguration;
