import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import mongooseInit from './config/mongooseInit.js';
import expressInit from './config/expressInit.js';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({credentials: true, origin: process.env.CORS_ORIG}));

mongooseInit();
expressInit(app);

app.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}...`));