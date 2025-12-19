import { ApolloServer } from 'apollo-server';
import { RedisCache } from 'apollo-server-cache-redis';

import { environment } from './environment';
import resolvers from './resolvers';
import typeDefs from './schemas';
import { GooglePlaceAPIDataSource } from './GooglePlaceAPIDataSource';

const server = new ApolloServer({
  resolvers,
  typeDefs,
  dataSources: () => {
    return {
      googlePlaceAPI: new GooglePlaceAPIDataSource(),
    };
  },
  cache: new RedisCache({
    host: 'localhost',
  }),
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground
});

server.listen(environment.port)
  .then(({ url}) => console.log(`Server ready at ${url}. `));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}