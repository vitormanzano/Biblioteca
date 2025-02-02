export const SessionSettings = {
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}

declare module 'express-session' {
    interface SessionData {
        token: string | undefined;
    }
}
