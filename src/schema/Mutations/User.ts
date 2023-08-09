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
        dni: { type: GraphQLString },
        names: { type: GraphQLString },
        age: { type: GraphQLInt },
        direction: { type: GraphQLString },
        lastnames: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(_: any, { id, dni, names, age, direction, lastnames, email, password }: any) {
        try {
            const userUpdate = await Users.findOneBy({ id });

            if (!userUpdate) {
                throw new Error(`Cliente con código ${id} no encontrado`);
            }

            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                userUpdate.password = hashedPassword;
            }

            userUpdate.dni = dni;
            userUpdate.names = names;
            userUpdate.age = age;
            userUpdate.direction = direction;
            userUpdate.lastnames = lastnames;
            userUpdate.email = email;

            await userUpdate.save();

            return true;
        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
            return false;
        }
    },
};
