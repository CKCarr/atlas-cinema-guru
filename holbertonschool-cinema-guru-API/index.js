const express = require('express');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/auth')
const titlesRouter = require('./routes/titles')
const userActivitiesRouter = require('./routes/userActivities')
const fs = require("fs");
const { Title } = require('./models/Title');
require('dotenv').config()

const app = express();
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:8000')
    .split(',')
    .map(origin => origin.trim());
const corsOptions = {
    origin: (origin, callback) => {
        const isCodespacesFrontend = /^https:\/\/[a-z0-9-]+-3000\.app\.github\.dev$/.test(origin || '');
        if (!origin || allowedOrigins.includes(origin) || isCodespacesFrontend) {
            callback(null, true);
        } else {
            callback(new Error(`Origin ${origin} is not allowed by CORS`));
        }
    },
}
app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/titles', titlesRouter);
app.use('/api/activity', userActivitiesRouter);

const port = process.env.PORT || 8000;

const start = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected and tables ready.');

    if (await Title.count() === 0) {
        const seedData = await fs.promises.readFile("dump.sql", 'utf8');
        await sequelize.query(seedData);
        console.log("DB Seeded");
    }

    app.listen(port, () => console.log('Server running...'));
};

start().catch(err => {
    console.error('Failed to initialize the database:', err);
    process.exit(1);
});
