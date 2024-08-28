"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../controllers/contactController");
const router = express_1.default.Router();
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
router.post('/', contactController_1.createContact);
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
router.delete('/admin/:id', contactController_1.deleteContact);
exports.default = router;
