import jsonwebtoken from "jsonwebtoken";

export default function validateJwt (req, res, next) {
    const jwt = req.headers["authorization"];
    
    jsonwebtoken.verify(jwt, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) {
            res.status(403).end();
            return;
        }

        req.userInfo = userInfo;
        next();
    });
};