// src/config/passport.ts
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID!,
        clientSecret: GOOGLE_CLIENT_SECRET!,
        callbackURL: GOOGLE_CALLBACK_URL!,
    },
    (_, __, profile, done) => {
        // Process the profile and create user in your database
        return done(null, profile);
    }));

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((obj: any, done) => {
    done(null, obj);
});

export default passport; // Modify this line to use default export