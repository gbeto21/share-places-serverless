import schema from '../../../schemas/place'

export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'put',
        path: 'places/{placeId}',
        authorizer: {
          name: 'auth'
        },
        request: {
          schema: {
            'application/json': schema
          }
        }
      },
      cors: true
    }
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: [
        'dynamodb:PutItem',
        'dynamodb:UpdateItem'
      ],
      Resource: `arn:aws:dynamodb:us-east-1:*:table/Place-dev`
    }
  ],
}