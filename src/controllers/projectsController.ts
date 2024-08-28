import mongoose from "mongoose";
import projectModel from "../models/projectsModel";
import asyncHandler from "express-async-handler";


const getProjects = asyncHandler(async (req: any, res: any) => {
    const projects = await projectModel.find();
    projects? res.status(200).json(projects) : res.status(404).json({ message: "No projects found" });
})

const createProject = asyncHandler(async (req: any, res: any) => {
    const image=req.file?req.file.path:"";
    if(image){
        req.body.projectImage=image;
    }
    const {title, description, link } = req.body;
    const project= await projectModel.findOne({ title ,link });
    if (project) return res.status(400).json({ message: "Project already exists" });
    const newProject = await projectModel.create({ title, description, link, projectImage:image });
    newProject? res.status(201).json(newProject) : res.status(400).json({ message: "Invalid project data" });
})

const updateProject = asyncHandler(async (req: any, res: any) => {
    const id = req.params.id;
    const image=req.file?req.file.path:"";
    if(image){
        req.body.projectImage=image;
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No project with that id");
    const updatedProject = await projectModel.findByIdAndUpdate(id, req.body, { new: true });
    updatedProject? res.status(200).json(updatedProject) : res.status(400).json({ message: "Invalid project data" });   
})

const deleteProject = asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No project with that id");
    const deletedProject= await projectModel.findByIdAndDelete(id);
    deletedProject? res.status(200).json("Project deleted successfully") : res.status(404).json({ message: "No project found" });
})

export { getProjects, createProject, updateProject, deleteProject };

