"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
const graphql_1 = require("graphql");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: graphql_1.GraphQLID },
        names: { type: graphql_1.GraphQLString },
        lastnames: { type: graphql_1.GraphQLString },
        age: { type: graphql_1.GraphQLInt },
        direction: { type: graphql_1.GraphQLString },
        dni: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString }
    }
});
