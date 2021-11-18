import 'source-map-support/register';

const getTime = () => {
  let today = new Date()
  return `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
}

const hello: any = async (event) => {
  console.log("Hi at: ", getTime());
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    message: `Hello, welcome to the exciting Serverless world! -${getTime()}`,
  }
}

export const main = hello;
