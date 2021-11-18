export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'places/{placeId}',
        authorizer: {
          name: 'auth'
        }
      },
      cors: true
    }
  ],
  iamRoleStatements: [
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