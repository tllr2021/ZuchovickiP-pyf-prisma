const { shield, allow, deny, or, and } =require("graphql-shield");
import { RuleAnd, RuleChain } from "graphql-shield/dist/rules";
const { ApolloError, } = require("apollo-server");
const { isAuthenticated ,isAuthenticatedAdmin } = require("./polices");


export const permissions = shield(
  {
    Query: {
      "*":or(isAuthenticated,isAuthenticatedAdmin)  ,
      
    },
    
    Mutation: {
      "*":or(isAuthenticated,isAuthenticatedAdmin),
      signup: allow,
      login: allow,
      loginAdmin: allow,
      createColaborator: allow,

    },
  
    
    
    
    
    
  },
  {
    
    allowExternalErrors: true,
    debug: true,
    fallbackError: (thrownThing, parent, args, context, info) => {
      if (thrownThing instanceof ApolloError) {
        // expected errors
        return thrownThing
      } else if (thrownThing instanceof Error) {
        // unexpected errors
        console.error(thrownThing)
        // await Sentry.report(thrownThing)
        return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER')
      } else {
        // what the hell got thrown
        console.error('The resolver threw something that is not an error.')
        console.error(thrownThing)
        return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER')
      }
    },
  }
  // { fallbackRule: deny },
);
