import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import dotenv from 'dotenv';
dotenv.config();

const gateway = new ApolloGateway({
        supergraphSdl: new IntrospectAndCompose({
                subgraphs: [
                        // Api Syntactic Extractor is in JS language
                        { name: "Api Syntactic Extractor", url: process.env.API_SYNTACTIC_EXTRACTOR_URL || "http://localhost:4001/graphql" },

                        // Api Dataset Generator is in Python language
                        { name: "Api Dataset Generator", url: process.env.API_DATASET_GENERATOR_URL || "http://localhost:4002" },

                        // Api Syntactic Similarity Analyzer is in Python language
                        { name: "Api Syntactic Similarity Analyzer", url: process.env.API_SYNTACTIC_SIMILARITY_ANALYZER_URL || "http://localhost:4003" },
                ],
        }),
});

const server = new ApolloServer({ gateway });

await startStandaloneServer(server, {
        listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
        console.log(`🚀 API Gateway ready at ${url}`);
}).catch((err) => {
        console.error(err);
});
