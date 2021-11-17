# Share places - Serverless Frontend

Serverless frontend project to manage the places.

## Functionality

React app to fetch, create, update, delete and generate signed urls to upload 
a image related to the place.

## Prerequisites
* <a href="https://github.com" target="_blank">GitHub account</a>
* <a href="https://nodejs.org/en/download/package-manager/" target="_blank">NodeJS</a> version 16.13.0 

## Initialice proyect locally

To initialice the application locally run the following commands in the root of the project:

```
# Install the npm dependencies
npm install

# Start the local environment
npm run start
```

You can configure the "Config.js" file set a specific value to the variables.

#### Config.json
```json
{
    "baseURL": "http://localhost:4000/dev",
    "domanin": "dev-07sod58o.us.auth0.com",
    "clientId": "AUddevsAFkqdnYouTabbt76PYbLkdn64"
}
```
