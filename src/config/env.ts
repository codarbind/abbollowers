import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default('3000'),
    POSTGRES_DB_USER: z.string(),
    POSTGRES_DB_PASSWORD: z.string(),
    POSTGRES_DB: z.string(),
    POSTGRES_DB_HOST: z.string(),
    JWT_SECRET:z.string(),
    SESSION_SECRET:z.string(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const envVars = envSchema.parse(process.env);

export const envconfig = {
    port: parseInt(envVars.PORT, 10),
    postgres_db_user: envVars.POSTGRES_DB_USER,
    postgres_db_password:envVars.POSTGRES_DB_PASSWORD,
    postgres_db_host:envVars.POSTGRES_DB_HOST,
    postgres_db:envVars.POSTGRES_DB,
    jwt_secret:envVars.JWT_SECRET,
    session_secret:envVars.SESSION_SECRET,
    nodeEnv: envVars.NODE_ENV,
};
