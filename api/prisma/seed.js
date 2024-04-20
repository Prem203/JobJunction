import { Prisma, PrismaClient } from "@prisma/client";
import {
  API_KEY,
  API_HOST,
  QUERY_WEB_DEVELOPMENT_JOBS,
  QUERY_PYTHON_DEVELOPMENT_JOBS,
  QUERY_COMPUTER_NETWORKING_JOBS,
  QUERY_MOBILE_APP_DEVELOPMENT_JOBS,
  QUERY_DATA_SCIENCE_JOBS,
  QUERY_UI_UX_DESIGN_JOBS,
  QUERY_SOFTWARE_DEVELOPMENT_JOBS,
  QUERY_SOFTWARE_ENGINEERING_JOBS,
  FETCH_PYTHON_DEVELOPMENT_JOBS_URL,
  FETCH_WEB_DEVELOPMENT_JOBS_URL,
  FETCH_COMPUTER_NETWORKING_JOBS_URL,
  FETCH_MOBILE_APP_DEVELOPMENT_JOBS_URL,
  FETCH_DATA_SCIENCE_JOBS_URL,
  FETCH_UI_UX_DESIGN_JOBS_URL,
  FETCH_SOFTWARE_DEVELOPMENT_JOBS_URL,
  FETCH_SOFTWARE_ENGINEERING_JOBS_URL,
} from "./apiConstants.js";

const prisma = new PrismaClient();

const fetchOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": API_HOST,
  },
};

// Reset the sequence of the Job table to start from 1
const resetJobSequence = async () => {
  try {
    await prisma.$executeRaw`ALTER TABLE Job AUTO_INCREMENT = 1;`;
    console.log("Sequence reset successfully.");
  } catch (error) {
    console.error("Error resetting sequence:", error);
  }
};

const resetUserSequence = async () => {
  try {
    await prisma.$executeRaw`ALTER TABLE User AUTO_INCREMENT = 1;`;
    console.log("Sequence reset successfully.");
  } catch (error) {
    console.error("Error resetting sequence:", error);
  }
};

const resetSavedJobSequence = async () => {
  try {
    await prisma.$executeRaw`ALTER TABLE SavedJobs AUTO_INCREMENT = 1;`;
    console.log("Sequence reset successfully.");
  } catch (error) {
    console.error("Error resetting sequence:", error);
  }
};

const fetchJobBasedOnQuery = async (queryString, url) => {
  console.log("Fetching jobs based on query:", queryString);
  const jobDataToSeed = [];

  try {
    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    console.log("data", data);
    if (data.status === "OK") {
      console.log("status", data.status);
      const fetchedJobData = data.data;

      fetchedJobData.forEach((job) => {
        console.log("checking job data");
        //checking if the job data is null
        if (
          !(
            job.job_title === null &&
            job.job_apply_link === null &&
            job.employer_website === null &&
            job.employer_name === null &&
            job.job_description === null
          )
        ) {
          if (job.job_description.length <= 5000) {
            if (job.job_country === "US") {
              console.log("updating job country");
              job.job_country = "United States";
            }
            if (job.employer_logo === null) {
              job.employer_logo = "../assets/jjs-logo-black.png";
            }
            console.log("pushing job data to seed");
            jobDataToSeed.push(job);
          }
        } else {
          console.log("some job data is null, discarding the job");
        }
      });
    }
    const responseFromDB = await addJobsToDatabase(queryString, jobDataToSeed);
    return responseFromDB;
  } catch (error) {
    console.error("Error fetching web development jobs:", error);
  }
};

const addJobsToDatabase = async (queryString, jobsToSeed) => {
  console.log("Adding jobs to the database", queryString);
  let createdDataResponse;
  try {
    // Process the data and create records in the database
    const response = await Promise.all(
      jobsToSeed.map(async (job) => {
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        };

        const postedDate = new Date(job.job_posted_at_timestamp * 1000);
        const formattedPostedDate = postedDate.toLocaleString("en-US", options);

        const expirationDate = new Date(
          job.job_offer_expiration_timestamp * 1000
        );
        const formattedExpirationDate = expirationDate.toLocaleString(
          "en-US",
          options
        );
        createdDataResponse = await prisma.$transaction(
          [
            prisma.job.upsert({
              where: { job_id: job.job_id },
              update: {},
              create: {
                job_id: job.job_id,
                query: queryString.tolowerCase(),
                employer_name: job.employer_name,
                employer_logo: job.employer_logo,
                employer_website: job.employer_website,
                employer_company_type: job.employer_company_type,
                job_publisher: job.job_publisher,
                job_title: job.job_title,
                job_apply_link: job.job_apply_link,
                job_apply_is_direct: job.job_apply_is_direct,
                job_description: job.job_description,
                job_is_remote: job.job_is_remote,
                job_posted_at_timestamp: job.job_posted_at_timestamp,
                job_posted_at_datetime: formattedPostedDate,
                job_city: job.job_city,
                job_state: job.job_state,
                job_country: job.job_country,
                job_google_link: job.job_google_link,
                job_offer_expiration_timestamp:
                  job.job_offer_expiration_timestamp,
                job_offer_expiration_datetime: formattedExpirationDate,
                job_required_experience: job.job_required_experience,
                job_required_skills: job.job_required_skills,
                job_required_education: job.job_required_education,
                job_min_salary: job.job_min_salary,
                job_max_salary: job.job_max_salary,
                job_salary_currency: job.job_salary_currency,
                job_salary_period: job.job_salary_period,
                job_highlights: job.job_highlights,
              },
            }),
          ],
          {
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
          }
        );
      })
    );
    return response;
  } catch (error) {
    console.error("Error adding jobs to the database:", error);
  }
};

async function main() {
  try {
    const webDevelopmentJobsResponse = await fetchJobBasedOnQuery(
      QUERY_WEB_DEVELOPMENT_JOBS,
      FETCH_WEB_DEVELOPMENT_JOBS_URL
    );
    console.log("Successfully seeded web development jobs");

    const pythonDevJobs = await fetchJobBasedOnQuery(
      QUERY_PYTHON_DEVELOPMENT_JOBS,
      FETCH_PYTHON_DEVELOPMENT_JOBS_URL
    );
    console.log("Successfully seeded python development jobs");

    const compNetworkJobs = await fetchJobBasedOnQuery(
      QUERY_COMPUTER_NETWORKING_JOBS,
      FETCH_COMPUTER_NETWORKING_JOBS_URL
    );
    console.log("Successfully seeded computer networking jobs");

    const mobileAppDevJobs = await fetchJobBasedOnQuery(
      QUERY_MOBILE_APP_DEVELOPMENT_JOBS,
      FETCH_MOBILE_APP_DEVELOPMENT_JOBS_URL
    );
    console.log("Successfully seeded mobile app development jobs");

    const dataScienceJobs = await fetchJobBasedOnQuery(
      QUERY_DATA_SCIENCE_JOBS,
      FETCH_DATA_SCIENCE_JOBS_URL
    );
    console.log("Successfully seeded data science jobs");

    const uiUxDesignJobs = await fetchJobBasedOnQuery(
      QUERY_UI_UX_DESIGN_JOBS,
      FETCH_UI_UX_DESIGN_JOBS_URL
    );
    console.log("Successfully seeded UI/UX design jobs");

    const softwareDevJobs = await fetchJobBasedOnQuery(
      QUERY_SOFTWARE_DEVELOPMENT_JOBS,
      FETCH_SOFTWARE_DEVELOPMENT_JOBS_URL
    );
    console.log("Successfully seeded software development jobs");

    const softwareEngJobs = await fetchJobBasedOnQuery(
      QUERY_SOFTWARE_ENGINEERING_JOBS,
      FETCH_SOFTWARE_ENGINEERING_JOBS_URL
    );
    console.log("Successfully seeded software engineering jobs");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// resetJobSequence();
// resetUserSequence();
// resetSavedJobSequence();
main();
