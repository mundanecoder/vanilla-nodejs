import { loadEnv } from "./dotenv.js";


loadEnv();

console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
