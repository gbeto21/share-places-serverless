export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'places',
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
      ],
      Resource: `arn:aws:dynamodb:us-east-1:*:table/Place-dev`
    }
  ],
}
