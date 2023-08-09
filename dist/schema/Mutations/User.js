"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_USER = exports.DELETE_USER = exports.CREATE_USER = void 0;
const graphql_1 = require("graphql");
const User_1 = require("../../Entities/User");
const User_2 = require("../typeDefs/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.CREATE_USER = {
    type: User_2.UserType,
    args: {
        names: { type: graphql_1.GraphQLString },
        lastnames: { type: graphql_1.GraphQLString },
        age: { type: graphql_1.GraphQLInt },
        direction: { type: graphql_1.GraphQLString },
        dni: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString }
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { names, lastnames, email, dni, age, direction, password } = args;
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const result = yield User_1.Users.insert({
                names: names,
                lastnames: lastnames,
                email: email,
                dni: dni,
                age: age,
                direction: direction,
                password: hashedPassword,
            });
            console.log(result);
            return Object.assign(Object.assign({}, args), { id: result.identifiers[0].id, password: hashedPassword });
        });
    },
};
exports.DELETE_USER = {
    type: graphql_1.GraphQLBoolean,
    args: {
        id: { type: graphql_1.GraphQLID },
    },
    resolve(_, { id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield User_1.Users.delete(id);
            if (result.affected === 1)
                return true;
            return false;
        });
    },
};
exports.UPDATE_USER = {
    type: graphql_1.GraphQLBoolean,
    args: {
        id: { type: graphql_1.GraphQLID },
        names: { type: graphql_1.GraphQLString },
        lastnames: { type: graphql_1.GraphQLString },
        age: { type: graphql_1.GraphQLInt },
        direction: { type: graphql_1.GraphQLString },
        dni: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString }
    },
    resolve(_, { id, names, lastnames, age, direction, dni, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id, names, lastnames, age, direction, dni, email, password);
            const userFound = yield User_1.Users.findOne(id);
            const itsMach = yield bcryptjs_1.default.compare(password, userFound.password);
            console.log(itsMach);
            return false;
        });
    }
};
