import Express from "express";
import {createContact , deleteContact} from "../controllers/contactController";
const router = Express.Router();



/**
 * @swagger
 * /api/v1/contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               phone:
 *                 type: string
 *                 example: 123-456-7890
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createContact);

/**
 * @swagger
 * /api/v1/contacts/admin/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the contact to delete
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 */
router.delete('/admin/:id', deleteContact);

export default router;