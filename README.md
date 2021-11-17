# Share places - Serverless

To implement this project, you need to implement a simple TODO application using AWS Lambda and Serverless framework.

## Functionality 

Manage places with the name, description and an image to remember the place. The funtionality includes: fetching, creating, updating and deleting places to logged users.

## Places data

The places properties contains the following fields:

* `placeId` (string) - a unique id for an item
* `name` (string) - name of a place item
* `imageUrl` (string) - a URL pointing to an image attached to a place item


## Prerequisites

* <a href="https://manage.auth0.com/" target="_blank">Auth0 account</a>
* <a href="https://github.com" target="_blank">GitHub account</a>
* <a href="https://nodejs.org/en/download/package-manager/" target="_blank">NodeJS</a> version 16.13.0 
* Serverless 2.66.1 or higer 
   * Create a <a href="https://dashboard.serverless.com/" target="_blank">Serverless account</a> user
   * Install the Serverless Framework’s CLI. Refer to the <a href="https://www.serverless.com/framework/docs/getting-started/" target="_blank">official documentation</a> for more help.
   ```bash
   npm install -g serverless
   serverless --version
   ```
   * Login and configure serverless to use the AWS credentials 
   ```bash
   # Login to your dashboard from the CLI. It will ask to open your browser and finish the process.
   serverless login
   # Configure serverless to use the AWS credentials to deploy the application
   # You need to have a pair of Access key (YOUR_ACCESS_KEY_ID and YOUR_SECRET_KEY) of an IAM user with Admin access permissions
   sls config credentials --provider aws --key YOUR_ACCESS_KEY_ID --secret YOUR_SECRET_KEY --profile serverless
   ```

## Repo structure
This repo contains the backend and the front end repositories.

### Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

### Frontend

To run a client application first edit the `./Config.json` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the serverless share places application.