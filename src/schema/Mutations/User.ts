import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLString } from 'graphql'
import { Users } from '../../Entities/User'
import { UserType } from '../typeDefs/User'
import bcrypt from 'bcryptjs'

export const CREATE_USER = {
    type: UserType,
    args: {
        names: { type: GraphQLString },
        lastnames: { type: GraphQLString },
        age: { type: GraphQLInt },
        direction: { type: GraphQLString },
        dni: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(_: any, args: any) {
        const { names, lastnames, email, dni, age, direction, password } = args

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await Users.insert({
            names: names,
            lastnames: lastnames,
            email: email,
            dni: dni,
            age: age,
            direction: direction,
            password: hashedPassword,
        })

        console.log(result)

        return { ...args, id: result.identifiers[0].id, password: hashedPassword }
    },
};

export const DELETE_USER = {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_: any, { id }: any) {
        const result = await Users.delete(id);
        if (result.affected === 1) return true;
        return false
    },
};

export const UPDATE_USER = {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLID },
        names: { type: GraphQLString },
        lastnames: { type: GraphQLString },
        age: { type: GraphQLInt },
        direction: { type: GraphQLString },
        dni: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(_: any, { id, names, lastnames, age, direction, dni, email, password }: any) {
        console.log(id, names, lastnames, age, direction, dni, email, password);

        const userFound = await Users.findOne(id)

        const itsMach = await bcrypt.compare(password, userFound!.password)

        console.log(itsMach)

        return false;
    }
}