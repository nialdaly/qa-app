# QA App
A BERT-powered Question Answering (QA) application built with React.

## Getting Started
A `config.js` file containing the API Gateway and Cognito details can be created at the root of the `src` directory. The `config.js` file should contain the following code:
```
const config = {
    apiGateway: {
      REGION: "YOUR_API_GATEWAY_REGION",
      URL: "YOUR_API_GATEWAY_URL",
    },
    cognito: {
      REGION: "YOUR_COGNITO_REGION",
      USER_POOL_ID: "YOUR_COGNITO_USER_POOL_ID",
      APP_CLIENT_ID: "YOUR_COGNITO_APP_CLIENT_ID",
      IDENTITY_POOL_ID: "YOUR_IDENTITY_POOL_ID",
    },
};
  
export default config;
```

## Additional Resources