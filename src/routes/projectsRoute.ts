import Express from "express";
import { getProjects, createProject, updateProject, deleteProject } from "../controllers/projectsController";
import upload from "../utils/upload";
import verifyBearer from "../utils/verifyBearer";
const router = Express.Router();



/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of all projects
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
 *                   title:
 *                     type: string
 *                     example: Project Title
 *                   description:
 *                     type: string
 *                     example: Detailed project description
 */
router.get("/", getProjects);

/**
 * @swagger
 * /api/projects/admin/:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: New Project
 *               description:
 *                 type: string
 *                 example: Description of the new project
 *               projectImage:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the project
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/admin/", verifyBearer, upload.single("projectImage"), createProject);

/**
 * @swagger
 * /api/projects/admin/{id}:
 *   put:
 *     summary: Update a project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Project Title
 *               description:
 *                 type: string
 *                 example: Updated project description
 *               projectImage:
 *                 type: string
 *                 format: binary
 *                 description: Updated image file for the project
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 */
router.put("/admin/:id", verifyBearer, upload.single("projectImage"), updateProject);

/**
 * @swagger
 * /api/projects/admin/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project to delete
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 */
router.delete("/admin/:id", verifyBearer, deleteProject);

export default router;
