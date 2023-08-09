import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLID },
        names: { type: GraphQLString },
        lastnames: { type: GraphQLString },
        age: { type: GraphQLInt },
        direction: { type: GraphQLString },
        dni: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    }
})