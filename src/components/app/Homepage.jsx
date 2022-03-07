import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetSurveysQuery, useGetStatsQuery } from "../../services/surveyApi";
import Surveys from "./Surveys";

function Homepage() {
	const { data, isFetching } = useGetStatsQuery();
	const globalStats = data?.stats;

	if (isFetching) return "Loading...";

	return (
		<>
			<div className="home-heading-container">
				<h1 className="welcome-heding">
					Create and share your own survey <br></br> in a simple way
				</h1>
				<p>
					There are currently
					<span className="highlighted"> {globalStats.totalSurveys} </span>
					active surveys,
					<span className="highlighted">
						{" "}
						{globalStats.totalClosedSurveys}{" "}
					</span>
					completed , a total of
					<span className="highlighted"> {globalStats.totalResearchs} </span>
					questions.
					<br></br> Over
					<span className="highlighted"> {globalStats.totalSurveys} </span>
					surveys of various categories are created daily
				</p>
			</div>
			<Surveys simplified />
			<div className="show-more">
				<Link to="/surveys">Show More</Link>
			</div>
			<div className="home-heading-container">
				<h2 className="heading">Top 10 Questions</h2>
			</div>
		</>
	);
}

export default Homepage;
