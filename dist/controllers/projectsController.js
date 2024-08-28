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
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjects = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const projectsModel_1 = __importDefault(require("../models/projectsModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const getProjects = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield projectsModel_1.default.find();
    projects ? res.status(200).json(projects) : res.status(404).json({ message: "No projects found" });
}));
exports.getProjects = getProjects;
const createProject = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.file ? req.file.path : "";
    if (image) {
        req.body.projectImage = image;
    }
    const { title, description, link } = req.body;
    const project = yield projectsModel_1.default.findOne({ title, link });
    if (project)
        return res.status(400).json({ message: "Project already exists" });
    const newProject = yield projectsModel_1.default.create({ title, description, link, projectImage: image });
    newProject ? res.status(201).json(newProject) : res.status(400).json({ message: "Invalid project data" });
}));
exports.createProject = createProject;
const updateProject = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const image = req.file ? req.file.path : "";
    if (image) {
        req.body.projectImage = image;
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        return res.status(404).send("No project with that id");
    const updatedProject = yield projectsModel_1.default.findByIdAndUpdate(id, req.body, { new: true });
    updatedProject ? res.status(200).json(updatedProject) : res.status(400).json({ message: "Invalid project data" });
}));
exports.updateProject = updateProject;
const deleteProject = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        return res.status(404).send("No project with that id");
    const deletedProject = yield projectsModel_1.default.findByIdAndDelete(id);
    deletedProject ? res.status(200).json("Project deleted successfully") : res.status(404).json({ message: "No project found" });
}));
exports.deleteProject = deleteProject;
