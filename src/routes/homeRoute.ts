import Express from "express";
import projectsModel from "../models/projectsModel";
import servicesModel from "../models/servicesModel";
import contactModel from "../models/contactModel";
const router = Express.Router();
import AsyncHandler from 'express-async-handler';


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
router.get('/', AsyncHandler(async (req, res) => {
    const projects = await projectsModel.find();
    const services = await servicesModel.find();
    const contacts = await contactModel.find();
    res.status(200).json({
        status: 'success',
        projects,
        services,
        contacts,
    });
}));



export default router