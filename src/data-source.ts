import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Product } from "./entity/Product"
import { Category } from "./entity/Category"
import { Profile } from "./entity/Profile"
import { Photo } from "./entity/Photo"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "ipchile",
    synchronize: true,
    logging: false,
    entities: [User,Product,Category,Profile,Photo],
    migrations: [],
    subscribers: [],
})
