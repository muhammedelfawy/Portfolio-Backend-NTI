"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectsModel_1 = __importDefault(require("../models/projectsModel"));
const servicesModel_1 = __importDefault(require("../models/servicesModel"));
const contactModel_1 = __importDefault(require("../models/contactModel"));
const router = express_1.default.Router();
const express_async_handler_1 = __importDefault(require("express-async-handler"));
/**
 * @swagger
 * /api/summary:
 *   get:
 *     summary: Get all projects, services, and contacts
 *     tags: [Summary]
 *     responses:
 *       200:
 *         description: Successfully retrieved projects, services, and contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 123
 *                       name:
 *                         type: string
 *                         example: Project Name
 *                       description:
 *                         type: string
 *                         example: Project Description
 *                 services:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 123
 *                       name:
 *                         type: string
 *                         example: Service Name
 *                       description:
 *                         type: string
 *                         example: Service Description
 *                 contacts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 123
 *                       name:
 *                         type: string
 *                         example: Contact Name
 *                       email:
 *                         type: string
 *                         example: contact@example.com
 *                       message:
 *                         type: string
 *                         example: Contact message content
 *       500:
 *         description: Server error
 */
router.get('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield projectsModel_1.default.find();
    const services = yield servicesModel_1.default.find();
    const contacts = yield contactModel_1.default.find();
    res.status(200).json({
        status: 'success',
        projects,
        services,
        contacts,
    });
})));
exports.default = router;
