import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetSurveysQuery, useGetStatsQuery } from "../../services/surveyApi";
import Surveys from "./Surveys";
import Loader from "../user/Loader";
import Filter from "../user/Filter";

function Homepage() {
	const { data, isFetching } = useGetStatsQuery();
	const globalStats = data?.stats;

	if (isFetching) {
		return <Loader />;
	}
	return (
		<>
			<div className="home-heading-container">
				<h1 className="welcome-heding">
					Create and share your own survey in a simple way
				</h1>
				<p>
					There are currently
					<span className="highlighted"> {globalStats.totalSurveys} </span>
					active surveys,
					<span className="highlighted">{globalStats.totalClosedSurveys} </span>
					completed , a total of
					<span className="highlighted"> {globalStats.totalResearchs} </span>
					questions.
					<br></br> Over
					<span className="highlighted"> {globalStats.totalSurveys} </span>
					surveys of various categories are created daily
				</p>
			</div>
			<Filter />
			<Surveys simplified={true} />
			<div className="show-more">
				<Link to="/surveys">Show More</Link>
			</div>
		</>
	);
}

export default Homepage;
