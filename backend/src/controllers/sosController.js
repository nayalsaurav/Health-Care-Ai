import sendGrid from "@sendgrid/mail";
import { PrismaClient } from "@prisma/client"; // Import Prisma Client

const prisma = new PrismaClient(); // Initialize Prisma Client
const SEND_GRID_KEY = process.env.SEND_GRID_KEY;
sendGrid.setApiKey(SEND_GRID_KEY);

export const postFeedback = async (req, res, next) => {
  try {
    // Check if the user is logged in
    // if (!req.user) {
    //     return res.status(403).json({ message: 'Access denied.' });
    // }

    // // Fetch user data from the database using Prisma
    // const user = await prisma.user.findUnique({
    //     where: { id: req.user.id }, // Assuming req.user contains the user's ID
    //     select: {
    //         email: true,
    //         fullName: true,
    //         relativeEmail: true,
    //     },
    // });

    // // Check if user exists
    // if (!user) {
    //     return res.status(404).json({ message: 'User not found.' });
    // }

    // const { email, fullName, relativeEmail } = user; // Destructure user data

    // Ensure latitude and longitude are provided in the request body
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required." });
    }
    const EMAIL = "singhsamarjeet0987@gmail.com";
    const receiverEmail = "nayalsaurav@gmail.com";

    // Prepare the feedback email
    const feedbackEmail = {
      to: receiverEmail, // Send to the relative's email
      from: process.env.SENDER_EMAIL, // Use the user's email as the sender
      subject: `Emergency Alert from Samarjeet Singh`,
      text: `Emergency! Come fast. Latitude: ${latitude}, Longitude: ${longitude}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Emergency Alert</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #d9534f;
            text-align: center;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
        }
        .map-image {
            width: 100%;
            height: auto;
            border: 1px solid #dddddd;
            margin: 20px 0;
        }
        .button {
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 10px 20px;
            text-align: center;
            color: #ffffff;
            background-color: #d9534f;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #888888;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Emergency Alert</h2>
        <p><strong>Sender Email:</strong> ${EMAIL}</p>
        <p><strong>Full Name:</strong> Samarjeet Singh</p>
        <p><strong>Message:</strong></p>
        <p>Emergency! Immediate assistance required at the following location:</p>
        <p><strong>Latitude:</strong> ${latitude}, <strong>Longitude:</strong> ${longitude}</p>
        <a href="https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}" target="_blank">
            <img class="map-image" src="https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&markers=color:red%7C${latitude},${longitude}&key=YOUR_API_KEY" alt="Map showing location">
        </a>
        <p>Click the map to view the location on Google Maps.</p>
        <a class="button" href="https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}" target="_blank">View on Google Maps</a>
        <p>Time is of the essence. Please respond immediately.</p>
        <div class="footer">
            <p>This is an automated message. Please do not reply.</p>
        </div>
    </div>
</body>
</html>
`,
    };

    // Send the email
    await sendGrid.send(feedbackEmail);

    // Respond with success message
    res.status(200).json({
      message: "Feedback sent successfully",
    });
  } catch (error) {
    console.error("Error sending feedback:", error);
    // Log the error response for debugging
    if (error.response) {
      console.error("Error response data:", error.response.body);
      console.error("Error response status:", error.response.status);
    }
    next(error); // Pass the error to the next middleware
  }
};
