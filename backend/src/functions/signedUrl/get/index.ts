export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'signedUrl/{placeId}',
        authorizer: {
          name: 'auth'
        },
        request: {}
      },
      cors: true
    }
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: [
        's3:PutObject',
      ],
      Resource: `arn:aws:s3:::places-dev/*`
    },
    {
      Effect: 'Allow',
      Action: [
        'dynamodb:Query',
        'dynamodb:UpdateItem'
      ],
      Resource: `arn:aws:dynamodb:us-east-1:*:table/Place-dev`
    }
  ],
}