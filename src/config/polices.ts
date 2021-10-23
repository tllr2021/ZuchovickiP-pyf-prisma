const { rule } =require("graphql-shield");
const { getUser , getColaborator } =require( '../utils');
const { ApolloError } = require("apollo-server");


export const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    const user = await getUser(ctx);
    if (user == null) {
      return new ApolloError(
        "user not loged",
        "ERR_NOT_LOGED"
      );
    }
    else{
      console.log("User: "+user.id+" is authenticated")
    }
    return true;
  }
);

export const isAuthenticatedAdmin = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    const admin = await getColaborator(ctx);
    if (admin == null) {
      return new ApolloError(
        "Admin not loged",
        "ERR_NOT_LOGED"
      );
    }
    else{
      console.log("Admin: "+admin.nomina+" is authenticated")
    }
    return true;
  }
);