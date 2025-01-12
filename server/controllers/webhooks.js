


//the webhooks secret we can take that after the deployment of project so that for now we can creeate a empty webhook secret in the .env file
import { Webhook } from "svix";
import User from "../models/User.js";

// API controller function to manage Clerk user data with the database
export const clerkWebhooks = async (req, res) => {
  try {
    // Step 1: Create an instance of the svix Webhook using the Clerk webhook secret
    // This secret is stored in the .env file for security
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Step 2: Verify the webhook request headers and body
    // This ensures the request is from Clerk and hasn't been tampered with
    await whook.verify(
      JSON.stringify(req.body), // Convert the request body to a string
      {
        "svix-id": req.headers["svix-id"], // Unique ID of this webhook request
        "svix-timestamp": req.headers["svix-timestamp"], // Timestamp of the request sent
        "svix-signature": req.headers["svix-signature"], // Signature to verify the data is not chnaged or tampered
      }
    );

    // Step 3: Extract the data and event type from the request body
    const { data, type } = req.body;

    // Step 4: Handle different webhook events using a switch-case
    switch (type) {
      case "user.created": {
        // Event: A new user was created
        // Prepare the user data to save to the database
        const userData = {
          _id: data.id, // User's unique ID
          email: data.email_addresses[0].email_addresses, // User's primary email
          name: data.first_name + " " + data.last_name, // User's full name
          image: data.image_url, // User's profile picture URL
          resume: "", // Default empty resume
        };

        // Save the new user in the database
        await User.create(userData);
        res.json({}); // Respond with an empty JSON object
        break;
      }

      case "user.updated": {
        // Event: A user was updated
        // Prepare the updated user data
        const userData = {
          email: data.email_addresses[0].email_addresses, // Updated email
          name: data.first_name + " " + data.last_name, // Updated full name
          image: data.image_url, // Updated profile picture URL
        };

        // Update the user in the database using their ID
        await User.findByIdAndUpdate(data.id, userData);
        res.json({}); // Respond with an empty JSON object
        break;
      }

      case "user.deleted": {
        // Event: A user was deleted
        // Remove the user from the database using their ID
        await User.findByIdAndDelete(data.id);
        res.json({}); // Respond with an empty JSON object
        break;
      }

      default:
        // Ignore unsupported events
        res.json({}); // Respond with an empty JSON object
        break;
    }
  } catch (error) {
    // Step 5: Handle errors
    console.log(error.message); // Log the error for debugging
    res.json({ success: false, message: "webhooks error" }); // Respond with an error message
  }
};
