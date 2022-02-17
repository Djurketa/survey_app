import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetSurveysQuery, useGetStatsQuery } from "../../services/surveyApi";
import Surveys from "./Surveys";
import Questions from "./Questionnaires";

function Homepage() {
  const { data, isFetching } = useGetStatsQuery();
  const globalStats = data?.stats;

  if (isFetching) return "Loading...";




  return (
    <>
      <div className="state-wrapper">
        <div className="state-item">
          <h3 >Total Surveys: {globalStats.totalSurveys}</h3>
        </div>
        <div className="state-item">
          <h3>Total Questions: {globalStats.totalClosedSurveys}</h3>
        </div>
        <div className="state-item" >
          <h3>Total Resarches: {globalStats.totalClosetQuestions}</h3>
        </div>
        <div className="state-item">
          <h3>Total Closed Surveys: {globalStats.totalQuestions}</h3>
        </div>
        <div className="state-item">
          <h3>Total Actiove Questions: {globalStats.totalResearchs}</h3>
        </div>
        <div className="state-item" >
          <h3>Total Closed Question: {globalStats.totalSurveys}</h3>
        </div>
      </div>
      <div className="home-heading-container">
        <h2 className="heading">
          Top 10 Surveys
        </h2>

      </div>
      <Surveys simplified />
      <div className="show-more">
        <Link to="/surveys">Show More</Link>
      </div>
      <div className="home-heading-container">
        <h2 className="heading">
          Top 10 Questions
        </h2>

      </div>
      <Questions simplified />
      <div className="show-more">
        <Link to="/questions">Show More</Link>
      </div>
    </>
  );
}

export default Homepage;
