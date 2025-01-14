import { Webhook } from "svix"; // Import svix for webhook verification
import dotenv from "dotenv";   // Import dotenv for environment variables
import User from "../models/User.js"; // Import the User model

dotenv.config(); // Load environment variables

export const clerkWebhooks = async (req, res) => {
  try {
    // Verify the webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the webhook headers and body
    const payload = JSON.stringify(req.body);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };
    await whook.verify(payload, headers);

    // Extract data and event type from the webhook payload
    const { data, type } = req.body;

    // Handle webhook events
    switch (type) {
      case "user.created": {
        const userData = {
          id: data.id, // Use 'id' to avoid conflicts with MongoDB's _id
          email: data.email_addresses[0].email, // Clerk's email field
          name: `${data.first_name} ${data.last_name}`, // Concatenate first and last names
          image: data.image_url, // Profile picture URL
          resume: "", // Default resume field
        };

        // Save the new user to the database
        await User.create(userData);
        console.log("User Created:", userData);
        res.status(201).json({ success: true, message: "User created" });
        break;
      }

      case "user.updated": {
        const updatedData = {
          email: data.email_addresses[0].email,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        };

        // Update the user in the database
        await User.findOneAndUpdate({ id: data.id }, updatedData);
        console.log("User Updated:", updatedData);
        res.status(200).json({ success: true, message: "User updated" });
        break;
      }

      case "user.deleted": {
        // Remove the user from the database
        await User.findOneAndDelete({ id: data.id });
        console.log("User Deleted:", data.id);
        res.status(200).json({ success: true, message: "User deleted" });
        break;
      }

      default:
        console.warn("Unhandled Webhook Event:", type);
        res.status(204).json({ success: true, message: "Event ignored" });
        break;
    }
  } catch (error) {
    console.error("Webhook Error:", error.message);
    res.status(500).json({ success: false, message: "Webhook processing error" });
  }
};
