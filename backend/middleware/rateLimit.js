import rateLimit from "express-rate-limit";

// General limiter for all API routes
export const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min
    max: 200,                 // 200 requests per IP
    standardHeaders: true, // return rate limit info in res headers
    legacyHeaders: false, // disable the X-RateLimit-* headers

    message: {
        success: false,
        message: "Too many requests, try again later",
    },
});


//limiter for auth routes
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 5,                    // 5 attempts per IP
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true, // don't count successful logins
    message: {
        success: false,
        message: "Too many login attempts, please try again after 15 minutes",
    },
});