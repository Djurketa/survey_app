import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserSurveysAsync } from "../../slices/surveysSlice";
import { getSurveyAsync } from "../../slices/surveySlice";
import { useNavigate } from "react-router-dom";

function UserSurveys({ simplified }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const limit = simplified ? 10 : 100;

	const surveysStatus = useSelector((state) => state.surveys.status);
	const surveys = useSelector((state) => {
		return state.surveys.userSurveys;
	});
	const user_id = useSelector((state) => {
		return state.survey.session.user_id;
	});
	function handleEditClick(e) {
		dispatch(getSurveyAsync(e.target.getAttribute("data-id")));
		navigate("/createsurvey");
	}

	useEffect(() => {
		dispatch(getUserSurveysAsync(user_id));
	}, [surveysStatus, dispatch]);

	return (
		<>
			{!simplified ? <h2>Surveys</h2> : ""}
			<div className="survey-card-container">
				{surveys?.map((survey) => (
					<div className="syrvey-card" key={survey.id}>
						<Link to={`/surey/${survey.survey_id}`}>
							<div>
								<img
									className="survay-img"
									src={require("../../images/categories/" + survey.img)}
								/>
								<h3>{survey.name}</h3>
								<p>Description : {survey.desc} </p>
							</div>
						</Link>
						<button
							data-id={survey.survey_id}
							onClick={handleEditClick}
							className="editor-btns edit">
							Edit
						</button>
					</div>
				))}
			</div>
		</>
	);
}

export default UserSurveys;
