import Express from "express";
import { getService, getServices, createService, updateService, deleteService } from "../controllers/servicesController";
import upload from "../utils/upload";
import verifyBearer from "../utils/verifyBearer";
const router = Express.Router();



/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: List of all services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 123
 *                   name:
 *                     type: string
 *                     example: Service Name
 *                   description:
 *                     type: string
 *                     example: Detailed service description
 */
router.get("/", getServices);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the service to retrieve
 *     responses:
 *       200:
 *         description: Service retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 123
 *                 name:
 *                   type: string
 *                   example: Service Name
 *                 description:
 *                   type: string
 *                   example: Detailed service description
 *       404:
 *         description: Service not found
 */
router.get("/:id", getService);

/**
 * @swagger
 * /api/services/admin/:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Service
 *               description:
 *                 type: string
 *                 example: Description of the new service
 *               serviceImage:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the service
 *     responses:
 *       201:
 *         description: Service created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/admin/", verifyBearer, upload.single("serviceImage"), createService);

/**
 * @swagger
 * /api/services/admin/{id}:
 *   put:
 *     summary: Update a service by ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the service to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Service Name
 *               description:
 *                 type: string
 *                 example: Updated service description
 *               serviceImage:
 *                 type: string
 *                 format: binary
 *                 description: Updated image file for the service
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Service not found
 */
router.put("/admin/:id", verifyBearer, upload.single("serviceImage"), updateService);

/**
 * @swagger
 * /api/services/admin/{id}:
 *   delete:
 *     summary: Delete a service by ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the service to delete
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Service not found
 */
router.delete("/admin/:id", verifyBearer, deleteService);


export default router;
