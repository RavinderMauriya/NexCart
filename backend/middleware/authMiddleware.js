import jwt from "jsonwebtoken";

export const authMiddleware = (...roles) => {
    return (req, res, next) => {

        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access token not found"
            });
        }

        const accessToken = header.split(" ")[1];

        try {
            const decoded = jwt.verify(
                accessToken,
                process.env.AC_SECRET_KEY
            );

            req.user = decoded;

            req.userId = decoded.userId;

            // role check only if roles provided
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden access"
                });
            }

            next();

        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid access token"
            });
        }
    };
};

export default authMiddleware;