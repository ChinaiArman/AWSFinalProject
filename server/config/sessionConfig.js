// IMPORTS
import session from 'express-session';
import SequelizeStoreFactory from 'connect-session-sequelize';
import dotenv from "dotenv";


// DOTENV CONFIG
dotenv.config();


// CONSTANTS
const SequelizeStore = SequelizeStoreFactory(session.Store);


// FUNCTION
function createSessionConfig(dbConfig) {
    const sessionStore = new SequelizeStore({
        db: dbConfig,
        tableName: 'sessions',
        expiration: 1000 * 60 * 60 * 24 * 14  // Set session expiration to 14 days
    });

    sessionStore.sync();

    const sameSite = process.env.NODE_ENV === 'production' ? 'none' : 'lax';
    const secure = process.env.NODE_ENV === 'production';
    return session({
        secret: process.env.SESSION_SECRET,
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure,
            sameSite,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    });
}


// EXPORT
export default createSessionConfig;