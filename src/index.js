// Dependencies
import { ApolloServer, makeExecutableSchema } from "apollo-server";

// Models
import models from "./models";

// Type Definitions & Resolvers
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/types";


// const typeDefs =`
// type Hello {
// message : String!
// }

// type Query {
//   sayHello(name: String!): Hello
// }
// `

// const resolvers ={
// Query: {
//   sayHello: (_, args) => {
//     return {

//       message: `helo ${args.name}`
//     }
//   }
// }
// }

// Schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Apollo Server
const apolloServer = new ApolloServer({
  schema,
  context: {
    models
  }
});

// Running Apollo Server
const alter = true;
const force = false;

models.sequelize.sync({ alter, force }).then(() => {
  // eslint-disable-next-line no-console
  
  apolloServer.listen(5000).then(({ url }) => console.log(`Running on ${url}`));
});
