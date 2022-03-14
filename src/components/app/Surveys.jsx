import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSurveysAsync } from "../../slices/surveysSlice";
import Survey from "./Survey";

function Surveys({ simplified }) {
	const dispatch = useDispatch();
	const surveysStatus = useSelector((state) => state.surveys.status);
	const surveys = useSelector((state) => {
		return state.surveys.surveys;
	});
	useEffect(() => {
		// if (surveysStatus === "idle") {
		dispatch(getSurveysAsync());
		// }
	}, []);

	return (
		<>
			{!simplified ? <h2 className="main-heading">Surveys</h2> : ""}
			<div className="survey-card-container">
				{surveys?.map((survey, key) => (
					<Survey key={key} survey={survey} />
				))}
			</div>
		</>
	);
}

export default Surveys;
