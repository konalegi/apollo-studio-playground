const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  type Query {
    me: User
  }

  type User @key(fields: "id") {
    age: Int
    floor1: Int!
    floor3: Int!
    floor4: Int!

    id: ID!
  }
`;
const user = {
  id: 2,
  age: 10,
  floor1: 1,
}
const promiseTimeout = time => () => new Promise(resolve => setTimeout(resolve, time));

const resolvers = {
  Query: {
    // me: async () => userResolver
    me: async () => {
      return {
        id: 2,
        age: async () => {
          return new Promise(function(resolve, reject){
            setTimeout(function(){ resolve(12)  }, 3000);
          })
        }
      }
    }
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen({ port: 6001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});