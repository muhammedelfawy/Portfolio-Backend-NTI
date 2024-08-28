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
exports.deleteService = exports.updateService = exports.createService = exports.getService = exports.getServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const servicesModel_1 = __importDefault(require("../models/servicesModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const getServices = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield servicesModel_1.default.find();
    projects ? res.status(200).json(projects) : res.status(404).json({ message: "No services found" });
}));
exports.getServices = getServices;
const getService = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const project = yield servicesModel_1.default.findById(id);
    project ? res.status(200).json(project) : res.status(404).json({ message: "No service found" });
}));
exports.getService = getService;
const createService = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.file ? req.file.path : "";
    if (image) {
        req.body.serviceImage = image;
    }
    const newService = yield servicesModel_1.default.create(req.body);
    newService ? res.status(201).json(newService) : res.status(400).json({ message: "Invalid service data" });
}));
exports.createService = createService;
const updateService = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const image = req.file ? req.file.path : "";
    if (image) {
        // const service = await serviceModel.findById(id);
        req.body.serviceImage = image;
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        return res.status(404).send("No service with that id");
    const updatedService = yield servicesModel_1.default.findByIdAndUpdate(id, req.body, { new: true });
    updatedService ? res.status(200).json(updatedService) : res.status(400).json({ message: "Invalid project data" });
}));
exports.updateService = updateService;
const deleteService = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        return res.status(404).send("No service with that id");
    const deletedService = yield servicesModel_1.default.findByIdAndDelete(id);
    deletedService ? res.status(200).json("service deleted successfully") : res.status(404).json({ message: "No project found" });
}));
exports.deleteService = deleteService;
