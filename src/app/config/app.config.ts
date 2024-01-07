import { registerAs } from '@nestjs/config';

const appConfig = registerAs('app', () => ({
    ENV: process.env.NODE_ENV,
    PORT: parseInt(process.env.PORT, 10) || 3000,
}));

export default appConfig;
