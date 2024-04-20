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

// app.post("/api/saveJob", requireAuth, async (req, res) => {});
