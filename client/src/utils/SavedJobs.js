import { SAVE_JOB_ENDPOINT, DELETE_SAVED_JOB_ENDPOINT } from "../constants.js";

export const addSavedJobsToDB = async (jobId, accessToken) => {
  const postURL = `${process.env.REACT_APP_API_URL}${SAVE_JOB_ENDPOINT}`;
  try {
    const response = await fetch(postURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ jobId }),
    });
    const data = await response.json();
    console.log("Saved jobs added to DB:", data);
  } catch (error) {
    console.error(error);
  }
};

export const removeSavedJobFromDB = async (jobId, accessToken) => {
  const deleteURL = `${process.env.REACT_APP_API_URL}${DELETE_SAVED_JOB_ENDPOINT}`;

  try {
    const response = await fetch(deleteURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ jobId }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete saved job");
    }

    const data = await response.json();
    console.log("Deleted saved job from DB:", data);
  } catch (error) {
    console.error("Error deleting saved job:", error);
  }
};
