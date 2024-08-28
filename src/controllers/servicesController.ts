import mongoose from "mongoose";
import serviceModel from "../models/servicesModel";
import asyncHandler from "express-async-handler";
import fs from "fs";


const getServices = asyncHandler(async (req: any, res: any) => {
    const projects = await serviceModel.find();
    projects? res.status(200).json(projects) : res.status(404).json({ message: "No services found" });
})

const getService = asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const project = await serviceModel.findById(id);
    project? res.status(200).json(project) : res.status(404).json({ message: "No service found" });
})

const createService = asyncHandler(async (req: any, res: any) => {
    const image=req.file?req.file.path:"";
    if(image){
        req.body.serviceImage=image;
    }
    const newService = await serviceModel.create(req.body);
    newService? res.status(201).json(newService) : res.status(400).json({ message: "Invalid service data" });
})

const updateService = asyncHandler(async (req: any, res: any) => {
    const {id} = req.params;
    const image=req.file?req.file.path:"";
    if(image){
        // const service = await serviceModel.findById(id);
        req.body.serviceImage=image;
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No service with that id");
    const updatedService = await serviceModel.findByIdAndUpdate(id, req.body, { new: true });
    updatedService? res.status(200).json(updatedService) : res.status(400).json({ message: "Invalid project data" });   
})

const deleteService = asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No service with that id");
    const deletedService= await serviceModel.findByIdAndDelete(id);
    deletedService? res.status(200).json("service deleted successfully") : res.status(404).json({ message: "No project found" });
})

export { getServices, getService, createService, updateService, deleteService };

