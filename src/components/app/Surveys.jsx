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
			{!simplified && (
				<div>
					<div className="home-heading-container">
						<h1 className="welcome-heding">
							Create and share your own survey in a simple way
						</h1>
					</div>
				</div>
			)}
			<div className="survey-card-container">
				{surveys?.map((survey, key) => (
					<Survey key={key} survey={survey} />
				))}
			</div>
		</>
	);
}

export default Surveys;
