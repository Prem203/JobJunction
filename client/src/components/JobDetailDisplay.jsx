import jobJunctionLogo from "../assets/jjs-logo-black.png";
import {
  findJobPostedDuration,
  convertTo12Hour,
  convertToDateFormat,
  convertMonthsToYears,
} from "../utils/TimeUtils.js";
import { LuDot } from "react-icons/lu";
import { PiMoney } from "react-icons/pi";
import { MdOutlineLocationOn, MdOutlineHomeWork } from "react-icons/md";

export const showCompanyLogo = (job) => {
  if (job.employer_logo === "../assets/jjs-logo-black.png") {
    return (
      <img
        src={jobJunctionLogo}
        alt="Job Junction"
        className="selected-job-logo"
      />
    );
  } else {
    return (
      <img
        src={job.employer_logo}
        alt={job.employer_name}
        className="selected-job-logo"
      />
    );
  }
};

export const showDurationInfo = (job) => {
  const postedDuration = findJobPostedDuration({ job });

  let expirationInfo = "";
  if (job.job_offer_expiration_datetime) {
    const [datePart, timePart] = job.job_offer_expiration_datetime.split(",");
    const expirationDate = convertToDateFormat(datePart);
    const expirationTime = convertTo12Hour(timePart);
    expirationInfo = (
      <>
        <LuDot className="dot" /> Apply by {expirationDate} at {expirationTime}
      </>
    );

    return (
      <div className="selected-job-duration">
        <p>
          Posted {postedDuration}
          {expirationInfo}
        </p>
      </div>
    );
  }
};

export const showSalaryInfo = (job) => {
  if (job.job_min_salary && job.job_max_salary && job.job_salary_currency) {
    return (
      <div className="selected-job-icon-text">
        <PiMoney className="glance-icons" />
        {job.job_salary_currency === "USD" ? "$" : job.job_salary_currency}
        {`${job.job_min_salary}-${job.job_max_salary}`}
        {job.job_salary_period === "HOUR"
          ? "/hr"
          : job.job_salary_period === "WEEK"
          ? "/wk"
          : "/yr"}
      </div>
    );
  }
};

export const showLocationInfo = (job) => {
  const locationDescription = job.job_is_remote ? "Remote" : "Onsite";

  return (
    <div className="selected-job-icon-text">
      <MdOutlineLocationOn className="glance-icons" />
      {` ${locationDescription}, based in `}
      {job.job_city && job.job_state ? (
        <>
          {job.job_city}, {job.job_state}
        </>
      ) : (
        <>{job.job_country}</>
      )}
    </div>
  );
};

export const showEmploymentTypeInfo = (job) => {
  if (!job.job_employment_type === null) {
    return (
      <div className="selected-job-icon-text">
        <MdOutlineHomeWork className="glance-icons" />
        {job.job_employment_type}
      </div>
    );
  }
  return null;
};

export const showJobDescription = (job) => {
  if (!job.job_description === null) {
    return (
      <div className="selected-job-description">
        <h2>Job Description</h2>
        {job.job_description}
      </div>
    );
  }
  return null;
};

export const showRequiredExperience = (job) => {
  if (!job.job_required_experience) {
    return (
      <div className="selected-job-experience">
        <h3>No information on experience</h3>
      </div>
    );
  }
  const requiredExperience = job.job_required_experience;

  if (requiredExperience) {
    const experienceInMonths = requiredExperience.required_experience_in_months;
    const noExperienceRequired = requiredExperience.no_experience_required;

    if (noExperienceRequired) {
      return (
        <div className="selected-job-experience">
          <h3>No Experience Required</h3>
        </div>
      );
    }

    if (experienceInMonths > 0) {
      const experienceInYears = convertMonthsToYears(experienceInMonths);

      return (
        <div className="selected-job-experience">
          <h3>Required Experience: {experienceInYears}</h3>
        </div>
      );
    }
  }

  return (
    <div className="selected-job-experience">
      <h3>No information on experience</h3>
    </div>
  );
};

export const showRequiredSkills = (job) => {
  if (job.job_required_skills && job.job_required_skills.length > 0) {
    return (
      <div className="selected-job-skills">
        <h3>Required Skills:</h3>
        <div className="selected-job-skills-list">
          {job.job_required_skills.map((skill, index) => (
            <div key={index} className="selected-job-skill">
              <LuDot className="dot" />
              {skill}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const showEducationInfo = (job) => {
  const requiredEducation = job.job_required_education;
  const pgDegree = requiredEducation.postgraduate_degree;
  const profCertificate = requiredEducation.professional_certification;
  const highSchool = requiredEducation.high_school;
  const associateDegree = requiredEducation.associate_degree;
  const bachelorsDegree = requiredEducation.bachelors_degree;
  if (
    pgDegree ||
    profCertificate ||
    highSchool ||
    associateDegree ||
    bachelorsDegree
  ) {
    return (
      <h3>
        Required Education:{" "}
        {pgDegree
          ? "Postgraduate Degree"
          : profCertificate
          ? "Professional Certificate"
          : highSchool
          ? "High School"
          : associateDegree
          ? "Associate Degree"
          : "Bachelors Degree"}
      </h3>
    );
  }
};

export const showJobHighlights = (job) => {
  if (!job.job_highlights) {
    return <p>No highlights available.</p>;
  }

  const highlights = job.job_highlights;

  return (
    <div className="job-highlights">
      {highlights.Qualifications && (
        <div className="job-qualifications">
          <h3>Qualifications</h3>
          <ul>
            {highlights.Qualifications.map((qualification, index) => (
              <li key={index}>{qualification}</li>
            ))}
          </ul>
        </div>
      )}

      {highlights.Responsibilities && (
        <div className="job-responsibilities">
          <h3>Responsibilities</h3>
          <ul>
            {highlights.Responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
