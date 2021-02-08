# QA App
A BERT-powered Question Answering (QA) application built with React. BERT which stands for Bidirectional Encoder Representations from Transformers is a Transformer-based machine learning technique for natural language processing (NLP) pre-training developed by Google BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers. This allows BERT to be fine-tuned on new tasks by implementing an additional output layer. Some of the popular downstream tasks that BERT has been fine-tuned for include Next Sentence Prediction (NSP), Masked Language Modelling (LM) and Question Answering (QA).

In this project, we use a BERT model fine-tuned on the [Stanford Question Answering Dataset (SQuAD)](https://rajpurkar.github.io/SQuAD-explorer/explore/v2.0/dev/1973_oil_crisis.html) reading comprehension dataset. This model is capable of returning an answer when a *context* and *question* are provided.

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
- [BERT Research Paper](https://arxiv.org/pdf/1810.04805.pdf)
- [BERT in Google Search](https://blog.google/products/search/search-language-understanding-bert/)
- [Question Answering with a Fine-Tuned BERT](https://mccormickml.com/2020/03/10/question-answering-with-a-fine-tuned-BERT/)