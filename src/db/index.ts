import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Database = PostgresJsDatabase<typeof schema>;

type MockDatabase = {
  select: () => {
    from: () => never[];
  };
  insert: () => {
    values: () => {
      returning: () => Promise<never[]>;
    };
  };
};

type DatabaseOrMock = Database | MockDatabase;

let db: DatabaseOrMock | null = null;
let queryClient: postgres.Sql | null = null;

const createMockDatabase = (): MockDatabase => ({
  select: () => ({
    from: () => [],
  }),
  insert: () => ({
    values: () => ({
      returning: () => Promise.resolve([]),
    }),
  }),
});

export const getDatabase = (): DatabaseOrMock => {
  if (!db) {
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL is not set, using mock database");
      db = createMockDatabase();
    } else {
      queryClient = postgres(process.env.DATABASE_URL, {
        max: 10,
        idle_timeout: 20,
        connect_timeout: 10,
      });

      db = drizzle(queryClient, { schema });
    }
  }

  return db;
};

export default getDatabase();
