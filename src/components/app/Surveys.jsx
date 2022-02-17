import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSurveysAsync } from "../../slices/surveysSlice";

function Surveys({ simplified }) {
	const dispatch = useDispatch();
	const limit = simplified ? 10 : 100;

	const surveysStatus = useSelector((state) => state.surveys.status);
	const surveys = useSelector((state) => {
		return state.surveys.surveys;
	});

	useEffect(() => {
		if (surveysStatus === "idle") {
			dispatch(getSurveysAsync());
		}
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
					</div>
				))}
			</div>
		</>
	);
}

export default Surveys;
