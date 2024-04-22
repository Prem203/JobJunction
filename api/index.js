import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";

// this is a middleware that will validate the access token sent by the client
const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: "RS256",
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// this is a public endpoint because it doesn't have the requireAuth middleware
app.get("/ping", (req, res) => {
  res.send("pong");
});

// add your endpoints below this line

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});

//handle 500 error -- display no jobs exist with this title!

app.post("/verify-user", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
  const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];
  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
  const user = await prisma.user.findUnique({
    where: {
      user_auth0_id: auth0Id,
    },
  });

  if (user) {
    res.json(user);
  } else {
    const newUser = await prisma.user.create({
      data: {
        user_email: email,
        user_auth0_id: auth0Id,
        user_first_name: firstName,
        user_last_name: lastName,
        user_date_joined: new Date(),
      },
    });

    res.json(newUser);
  }
});

app.get("/api/fetchAllJobs", async (req, res) => {
  const allJobs = await prisma.job.findMany();
  console.log("allJobs", allJobs);
  res.json(allJobs);
});

app.get("/api/fetchSavedJobs", requireAuth, async (req, res) => {
  console.log("fetching saved jobs from DB");
  const auth0Id = req.auth.payload.sub;
  const savedJobs = await prisma.user.findUnique({
    where: {
      user_auth0_id: auth0Id,
    },
    select: {
      SavedJobs: true,
    },
  });
  console.log("savedJobs", savedJobs);
  res.json(savedJobs);
});

app.post("/api/fetchSpecificJob", async (req, res) => {
  const { jobIds } = req.body;

  if (!jobIds || !Array.isArray(jobIds)) {
    return res.status(400).json({ error: "Invalid jobIds array" });
  }

  try {
    const jobs = await prisma.job.findMany({
      where: {
        job_id: {
          in: jobIds,
        },
      },
    });

    console.log("jobs", jobs);
    res.json({ JobDetails: jobs });
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/saveJob", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const { jobId } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      user_auth0_id: auth0Id,
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    // Check if the saved job already exists
    const existingSavedJob = await prisma.savedJobs.findFirst({
      where: {
        user_id: user.user_id, // Assuming 'user_id' is the primary key for 'User'
        job_id: jobId,
      },
    });

    if (existingSavedJob) {
      return res.status(409).json({ error: "Job already saved" });
    }

    const newSavedJob = await prisma.savedJobs.create({
      data: {
        user: {
          connect: {
            user_auth0_id: auth0Id,
          },
        },
        job: {
          connect: {
            job_id: jobId,
          },
        },
      },
    });

    return res.json(newSavedJob);
  } catch (error) {
    console.error("Error creating saved job:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/deleteSavedJob", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const { jobId } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      user_auth0_id: auth0Id,
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    // Check if the job to be deleted exists in savedJobs
    const existingSavedJob = await prisma.savedJobs.findFirst({
      where: {
        user_id: user.user_id,
        job_id: jobId,
      },
    });

    if (!existingSavedJob) {
      return res.status(404).json({ error: "Saved job not found" });
    }

    // If found, delete it
    await prisma.savedJobs.delete({
      where: {
        saved_id: existingSavedJob.saved_id, // Use the primary key to delete
      },
    });

    return res.json({ message: "Job unsaved successfully" });
  } catch (error) {
    console.error("Error deleting saved job:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/fetchUserDetails", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  console.log("auth0Id", auth0Id);
  console.log("req.auth", req.body);
  const user = await prisma.user.findUnique({
    where: {
      user_auth0_id: auth0Id,
    },
    select: {
      user_id: true,
      user_email: true,
      user_first_name: true,
      user_last_name: true,
      user_linkedin: true,
      user_github: true,
      user_twitter: true,
      user_resume_link: true,
      user_cover_letter: true,
      user_work_exp: true,
      user_major: true,
      user_project: true,
      user_auth0_id: true,
    },
  });
  console.log("user", user);
  res.json(user);
});

app.get("/api/fetchSpecificUser/:user_id", requireAuth, async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: Number(user_id) },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/updateUserDetails/:user_id", requireAuth, async (req, res) => {
  const { user_id } = req.params; // Extract user_id from URL
  const {
    user_linkedin,
    user_github,
    user_twitter,
    user_major,
    user_work_exp,
    user_cover_letter,
    user_resume_link,
    user_project,
  } = req.body;

  console.log("req.body", req.body);

  try {
    const updatedUser = await prisma.user.update({
      where: { user_id: Number(user_id) },
      data: {
        user_linkedin,
        user_github,
        user_twitter,
        user_major,
        user_work_exp,
        user_cover_letter,
        user_resume_link,
        user_project,
      },
    });

    res.json(updatedUser); // Return the updated user data
    console.log("updatedUser", updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
