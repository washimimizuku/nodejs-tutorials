const { ApolloServer, gql } = require('apollo-server');
const { RedisCache } = require('apollo-server-cache-redis');

const GooglePlaceAPI = require('./src/GooglePlaceAPI.js') // Google Place API DataSource
const typeDefs = require('./src/schema.graphql.js'); // GraphQL Schema
const resolvers = require('./src/resolvers.js'); // GraphQL Resolvers

// GraphQL Server (Apollo)
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  dataSources: () => {
    return {
      googlePlaceAPI: new GooglePlaceAPI(),
    };
  },
  cache: new RedisCache({
    host: 'localhost',
  }),

});

// Launch Server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});