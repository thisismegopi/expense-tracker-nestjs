import { registerAs } from '@nestjs/config';

const appConfig = registerAs('config', () => ({
    ENV: process.env.NODE_ENV,
    PORT: parseInt(process.env.PORT, 10) || 3000,
}));

export default appConfig;
