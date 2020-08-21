const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  type User @extends @key(fields: "id") {
    age: Int @external
    id: ID! @external
    name: String @requires(fields: "age")
    sex: String
    surname: String
  }
`;

const resolvers = {
  User: {
    __resolveReference(object) {
      return {
        sex: 'helicopter',
        surname: 'apache'
      };
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen({ port: 6002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});