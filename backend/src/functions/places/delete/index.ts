export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'places/{placeId}',
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
        'dynamodb:Query',
        'dynamodb:DeleteItem'
      ],
      Resource: `arn:aws:dynamodb:us-east-1:*:table/Place-dev`
    },
    {
      Effect: 'Allow',
      Action: [
        's3:DeleteObject',
      ],
      Resource: `arn:aws:s3:::places-dev/*`
    },
  ],
}