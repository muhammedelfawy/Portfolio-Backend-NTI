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
exports.deleteContact = exports.createContact = void 0;
const contactModel_1 = __importDefault(require("../models/contactModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createContact = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
        return res.status(400).json({ message: "All fields are required" });
    const newContact = yield contactModel_1.default.create({ name, email, message });
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        host: "smtp.gmail.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: 'New Review',
        text: `You have a new review from ${req.body.name} 
        with email ${req.body.email}
        Message: ${req.body.message}`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(400).json(error.message);
        }
        else {
            console.log('Email sent: ' + info.response);
            newContact ? res.status(201).json("emailSent", newContact) : res.status(400).json({ message: "Invalid contact data" });
        }
    });
}));
exports.createContact = createContact;
const deleteContact = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const contact = yield contactModel_1.default.findByIdAndDelete(id);
    contact ? res.status(200).json("Contact Deleted") : res.status(200).json("No Contact Founded");
}));
exports.deleteContact = deleteContact;
