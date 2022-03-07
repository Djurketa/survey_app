import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSurveysAsync } from "../../slices/surveysSlice";
import Survey from "../app/Survey";

function UserSurveys({ simplified }) {
	const dispatch = useDispatch();
	const surveysStatus = useSelector((state) => state.surveys.status);
	const surveys = useSelector((state) => {
		return state.surveys.userSurveys;
	});
	const user_id = useSelector((state) => {
		return state.survey.session.user_id;
	});

	useEffect(() => {
		dispatch(getUserSurveysAsync(user_id));
	}, [surveysStatus, dispatch]);

	return (
		<>
			{!simplified ? <h2 className="main-heading">Your Surveys</h2> : ""}
			<div className="survey-card-container">
				{surveys?.map((survey) => (
					<>
						<Survey key={survey.survey_id} survey={survey} />
					</>
				))}
			</div>
		</>
	);
}

export default UserSurveys;
