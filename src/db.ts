import { createConnection } from "typeorm";
import { Users } from "./Entities/User";

export const connectDB = async () => {
    await createConnection({
        type: 'mysql',
        username: 'root',
        password: '1234',
        port: 3306,
        host: 'localhost',
        database: 'graphqlapi',
        entities: [Users],
        synchronize: false,
        ssl: false
    })
}