import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styling/styles.css";

export default function AboutPage() {
  const iconList = ["home"];
  return (
    <>
      <Header headerTag={"About"} iconList={iconList} />
      <div className="about-page">
        <div className="about-page-content">
          <p>
            Welcome to Job Junction, your go-to destination for finding the
            perfect job match! Whether you're a seasoned professional looking
            for new opportunities or just starting your career journey, Job
            Junction is here to help.
          </p>
          <p>
            At Job Junction, we understand the importance of finding the right
            job that aligns with your skills, interests, and career goals.
            That's why we've created a user-friendly platform that connects job
            seekers with employers seamlessly.
          </p>
          <p>
            Our mission is to empower individuals to take control of their
            careers by providing access to a wide range of job listings across
            various industries and locations. With advanced search features and
            personalized recommendations, Job Junction makes job hunting
            efficient and stress-free.
          </p>
          <p>
            Whether you're looking for full-time, part-time, freelance, or
            remote opportunities, Job Junction has you covered. Join our
            community today and take the next step towards a fulfilling career!
          </p>
          <p>
            Job Junction offers a range of features to enhance your job search
            experience. From advanced filtering options to save your
            preferences, to resume building tools to help you stand out to
            employers, we've got everything you need to land your dream job.
          </p>
          <p>
            We believe in the power of community and collaboration. Join our
            forums to connect with other job seekers, share tips and advice, and
            learn from industry experts. Together, we can support each other on
            our career journeys and achieve our professional goals.
          </p>
          <p>
            Job Junction is committed to diversity, equity, and inclusion. We
            strive to create an inclusive platform where everyone has equal
            access to opportunities, regardless of background or identity. Your
            unique talents and perspectives are valued and celebrated here.
          </p>
          <p>
            Get started with Job Junction today and take the first step towards
            a brighter future. Your next career adventure awaits!
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
}
