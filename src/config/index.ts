import { config } from 'dotenv';
import {dirname, resolve} from "path";
__dirname = resolve(dirname(''));

config({ path: `${__dirname}/envs/.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
