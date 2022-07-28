import { DataSource } from "typeorm";
import { ormConfig } from "./typeorm.config";

const dataSource = new DataSource({
  ...ormConfig,
  migrations: ['src/migrations/*.ts'],
  // cli: {
  //   migrationsDir: 'src/migrations'
  // },
});
dataSource.initialize();
export default dataSource; 