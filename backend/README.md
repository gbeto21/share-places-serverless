# Share places - Serverless Backend

Serverless backend project to manage the places.

## Functionality

API to fetch, create, update, delete and generate signed urls to upload 
a image related to the place.

## Prerequisites
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

## Initialice proyect locally

To initialice the application locally run the following commands in the root of the project:

```
# Install the npm dependencies
npm install

# Start the local environment
serverless offline start
```

You can configure the "custom" object of the serverless.ts file to chose a specific port for the DynamoDB and server port.

## Endpoints

**All the endpoints need a token in order to validate the user.**

This API exposes the next endpoints:


### Get places

`GET /dev/places/`
#### Body
```json
{}
```
#### Response
```json
{
    "places": [
        {
            "placeId": "3e6a501c-ba44-4986-9d17-da2bb139afb1",
            "name": "Example place",
            "description": "Awesome place",
            "userId": "google-oauth2|101284071362295645843",
            "imageUrl": ""
        }
    ]
}
```

### Get place

`GET /dev/places/{placeId}`

#### Response
```json
{
    "placeId": "3e6a501c-ba44-4986-9d17-da2bb139afb1",
    "name": "Example place",
    "description": "Awesome place",
    "userId": "google-oauth2|101284071362295645843",
    "imageUrl": ""
}
```

### Create a place

`POST /dev/places`
#### Body
```json
{
    "name": "Example place",
    "description": "Awesome place"
}
```
#### Response
```json
{
    "placeId": "3e6a501c-ba44-4986-9d17-da2bb139afb1",
    "name": "Example place",
    "description": "Awesome place",
    "userId": "google-oauth2|101284071362295645843",
    "imageUrl": ""
}
```

### Update a place

`PUT /dev/places`
#### Body
```json
{
    "name": "An upated place.",
    "description": "Great place to hollydays."
}
```
#### Response
```json
{}
```

### Update a place

`PUT /dev/places/{placeId}`
#### Body
```json
{
    "name": "An upated place.",
    "description": "Great place to hollydays."
}
```
#### Response
```json
{}
```

### Delete a place

`DELETE /dev/places/{placeId}`
#### Body
```json
{}
```
#### Response
```json
{}
```
**Note:** When a place is deleted the image in the S3 bucket is also deleted.

### Get signed url

`GET /dev/signedUrl/{}`
#### Body
```json
{}
```
#### Response
```json
{
    "uploadUrl": "https://places-dev.s3.amazonaws.com/14d1e2cf-8af6-41f8-8bd0-aa2d99849687?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZ5E2WLF5VRZO5M42%2F20211117%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211117T210832Z&X-Amz-Expires=650&X-Amz-Signature=02035da3df5de796b379b9cfb7140aecb8950adef8fc569566bda79aac80809d&X-Amz-SignedHeaders=host"
}
```