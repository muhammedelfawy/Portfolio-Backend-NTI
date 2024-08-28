import dotenv from 'dotenv';
dotenv.config();

const verifyBearer = (req, res, next) => {
    const authHeader = req.cookies['auth'];
    if (!authHeader) return res.status(401).send("You are not authorized to access this route");
    if (authHeader !== process.env.API_KEY) return res.status(401).send("You are not authorized to access this route");
    next();
}


export default verifyBearer;