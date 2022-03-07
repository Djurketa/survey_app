import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSurveyAsync } from "../../slices/surveySlice";
import QuestionsList from "./QuestionsList";
function SurveyFill() {
	const { survey_id } = useParams();

	const dispatch = useDispatch();
	dispatch(getSurveyAsync(survey_id));

	return (
		<div className="survey-preview-wrapper">
			<QuestionsList />
		</div>
	);
}

export default SurveyFill;
