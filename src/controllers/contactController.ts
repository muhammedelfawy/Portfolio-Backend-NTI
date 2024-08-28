import contactModel from "../models/contactModel";
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const createContact = asyncHandler(async (req: any, res: any) => {
    const {name, email, message} = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: "All fields are required" });
    const newContact = await contactModel.create({ name, email, message });


    const transporter = nodemailer.createTransport({
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
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(400).json(error.message);
        } else {
          console.log('Email sent: ' + info.response);
          newContact? res.status(201).json("emailSent",newContact) : res.status(400).json({ message: "Invalid contact data" });
        }
      });
})

const deleteContact=asyncHandler(async(req, res)=>{
    const id = req.params.id
    const contact=await contactModel.findByIdAndDelete(id)
    contact ? res.status(200).json("Contact Deleted") : res.status(200).json("No Contact Founded")
})



export { createContact , deleteContact}