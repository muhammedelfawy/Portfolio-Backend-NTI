"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_1 = require("../swagger");
dotenv_1.default.config();
const app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
// call routes
const DBconnection_1 = __importDefault(require("./config/DBconnection"));
const projectsRoute_1 = __importDefault(require("./routes/projectsRoute"));
const servicesRoute_1 = __importDefault(require("./routes/servicesRoute"));
const contactRoute_1 = __importDefault(require("./routes/contactRoute"));
const homeRoute_1 = __importDefault(require("./routes/homeRoute"));
// start request pipeline
app.use('/api/v1/projects', projectsRoute_1.default);
app.use('/api/v1/services', servicesRoute_1.default);
app.use('/api/v1/contacts', contactRoute_1.default);
app.use('/', homeRoute_1.default);
app.get("/hello", (req, res) => {
    res.status(200).send('Hello World');
});
app.use('/api-docs', swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerSpec));
app.get("/secret-path-API", (req, res) => {
    const { password } = req.body;
    if (password !== process.env.API_PASSWORD) {
        return res.status(401).send('You are not authorized to access this route');
    }
    const token = process.env.API_KEY;
    return res.cookie("auth", token, { httpOnly: true, secure: true }).send('Generated token successfully');
});
app.use((err, req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: err.message
    });
});
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'Page not found'
    });
});
// start server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    (0, DBconnection_1.default)();
});
// Handle rejection outside express
process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(() => {
        console.error(`Shutting down....`);
        process.exit(1);
    });
});
