// Import the Job model to interact with the database
import Job from "../models/Job.js";

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    // Find all jobs where "visible" is true
    const jobs = await Job.find({ visible: true })
      // Populate the "companyId" field with actual company details (excluding the password)
      .populate({ path: 'companyId', select: '-password' });

    // Send a success response with the list of jobs
    res.json({ success: true, jobs });
  } catch (error) {
    // If there's an error, send a failure response with the error message
    res.json({ success: false, message: error.message });
  }
};

// Get a single job by ID
export const getJobById = async (req, res) => {
  try {
    // Extract the "id" parameter from the request
    const { id } = req.params;

    // Find the job by its ID in the database
    const job = await Job.findById(id)
      // Populate the "companyId" field with actual company details (excluding the password)
      .populate({ path: 'companyId', select: '-password' });

    // If the job is not found, send a "Job not found" response
    if (!job) {
      return res.json({
        success: false,
        message: 'Job not found'
      });
    }

    // If the job is found, send a success response with the job details
    res.json({
      success: true,
      job
    });
  } catch (error) {
    // If there's an error (like invalid ID or database issue), send a failure response with the error message
    return res.json({
      success: false,
      message: error.message
    });
  }
};
