import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const sqliteConfig: SqliteConnectionOptions = {
  type: "sqlite",
  database: process.env.DATABASE_NAME_FOR_DEV,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: [__dirname + "/libs/shared/src/db-migrations/*{.ts,.js}"],
  }

  export default sqliteConfig;