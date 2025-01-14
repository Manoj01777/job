import { messageInRaw } from "svix";
import Company from "../models/Company.js";
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";

// Register a new company
export const registerCompany = async (req,res) => {
    const {name,email,password} = req.body
    
    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.json({success:false, message:"Missing Details"})
    }

    try {
        const companyExists = await Company.findOne({email})
        if (companyExists) {
            return res.json({success:false,message:'Comapany already registered'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })

    } catch (error) {
        res.json({success:false, message: error.message})
    }


}

// Company login
export const loginCompany = async (req,res) => {

    const {email,password} = req.body

    try {
        const company = await Company.findOne({email})

        if (bcrypt.compare(password,company.password)) {
            res.json({
                success:true,
                company:{
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })
        }
        else{
            res.json({success:false, message:'Invalid email or password'})
        }
    } catch (error) {
        res.json({success:false,message:error.message})
    }

}

// Get company data
export const getCompanyData = async (req,res) => {


    try {
        
        const company = req.company

        res.json({success:true, company})
    } catch (error) {
        res.json({
            success:false,message:error.message
        })
    }
}

// Post a new job
export const postJob = async (req,res) => {

    const {title,description,location,salary,level,category} = req.body

    const companyId = req.company._id
    
    try {
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            Date: Date.now(),
            level,
            category
        })

        await newJob.save()

        res.json({success:true, newJob})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
    
 
}

// Get Company Job Applicants
export const getCompanyJobApplicants = async (req,res) => {

}

//Get Company Posted Jobs
export const getCompanyPostedJobs = async (req,res) => {
    try {
        
        const companyId = req.company._id

        const jobs = await Job.find({companyId})

        // (ToDo) Adding No.of applicants info in data

        res.json({success:true, jobsData:jobs})
    } catch (error) {
        res.json({success:false,message:error.message})
    }

}

// Change Job Application Status
export const ChangeJobApplicationsStatus = async (req,res) => {

}

// Change job visibility
// Exporting the function so it can be used in other files
export const changeVisiblity = async (req, res) => {
    try {
        // Extracting the `id` from the request body (the ID of the job)
        const { id } = req.body;

        // Getting the company ID from the request object (usually set during authentication)
        const companyId = req.company._id;

        // Finding the job in the database by its ID
        const job = await Job.findById(id);

        // Checking if the company making the request owns the job
        if (companyId.toString() === job.companyId.toString()) {
            // If yes, toggle the `visible` property of the job
            job.visible = !job.visible;
        }

        // Saving the updated job back to the database
        await job.save();

        // Sending a success response with the updated job details
        res.json({ success: true, job });
    } catch (error) {
        // If something goes wrong, send an error response with the error message
        res.json({ success: false, message: error.message });
    }
};
