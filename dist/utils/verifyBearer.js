"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyBearer = (req, res, next) => {
    const authHeader = req.cookies['auth'];
    if (!authHeader)
        return res.status(401).send("You are not authorized to access this route");
    if (authHeader !== process.env.API_KEY)
        return res.status(401).send("You are not authorized to access this route");
    next();
};
exports.default = verifyBearer;
