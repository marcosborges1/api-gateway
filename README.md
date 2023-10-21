# API Gateway

## Overview

The API Gateway aims to provide a single access point to the three components of Agape Approach: the API Syntactic Extractor, the API Dataset Generator, and the API Syntactic Similarity Analyzer. It transparently routes and manages all request traffic to specific destination components that hold the respective information.

By registering these components, the API Gateway can collate information from the schema of each component, as well as the endpoints to obtain information wherever they reside. As a result, it possesses a comprehensive super schema that encompasses all functionalities available in the registered components. Figure 1 shows the registration of that three (3) microservices.

![API Gateway Diagram](/images/api_gateway.png)

_Figure 1: Example of the API Gateway registering the components in parallel._

## Implementation Details

Constructed using JavaScript, the API Gateway is a lightweight, dynamic, and web-compatible solution. The choice of language complements the ASE algorithm's versatility and caters to the overarching requirements of the System of Systems context, as described within the Agape approach.

## Setup

Use the package manager [npm](https://www.npmjs.com) to install the ASE.

```bash
npm install
```

### Initialization and Registration

Before initiating the **API Gateway**, please ensure the following steps:

1. The three microservices: **Api Syntactic Extractor**, **Api Dataset Generator**, and **Api Syntactic Similarity Analyzer** are initialized.

2. They are correctly registered on their respective ports.

The subsequent code snippet illustrates how the API Gateway registers these microservices using environment variables:

```javascript
// Ommited details
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      // Api Syntactic Extractor is in JS language
      {
        name: "Api Syntactic Extractor",
        url:
          process.env.API_SYNTACTIC_EXTRACTOR_URL ||
          "http://localhost:4001/graphql",
      },

      // Api Dataset Generator is in Python language
      {
        name: "Api Dataset Generator",
        url: process.env.API_DATASET_GENERATOR_URL || "http://localhost:4002",
      },

      // Api Syntactic Similarity Analyzer is in Python language
      {
        name: "Api Syntactic Similarity Analyzer",
        url:
          process.env.API_SYNTACTIC_SIMILARITY_ANALYZER_URL ||
          "http://localhost:4003",
      },
    ],
  }),
});
// Ommited details
```

**Note**:

- The default microservices PORTS are _4001_,_4002_, and _4003_, but them can be changed for your convenience.

## Usage

Before running the API Gateway, be sure to start it.

```bash
npm start
```

Access the ASE from the GraphQL endpoint:

```bash
http://localhost:4000/
```

**Note**:

- The default PORT is _4000_, but can be change for your convenience.
- This project heavily relies on GraphQL, a powerful query language for APIs, and a server-side runtime for executing those queries with your existing data. If you're unfamiliar with GraphQL or wish to dive deeper, you can [learn more about GraphQL here](https://graphql.org/).

## References

- **Agape Approach**: As the Agape approach is being validated through conferences and journals, updates will be periodically provided here. Once the validation process concludes and findings are published, a direct link to the paper will be shared in this section for easy accessibility.

## Project Status

The **Agape Approach**, currently in the evolutionary phase, functions as a proof of concept. It is actively undergoing improvements and changes to refine its capabilities and more effectively meet new requirements.

## Author

**Marcos Borges**  
PhD Student at Federal University of Ceará, Brazil  
Email: [marcos.borges@alu.ufc.br](mailto:marcos.borges@alu.ufc.br)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.
