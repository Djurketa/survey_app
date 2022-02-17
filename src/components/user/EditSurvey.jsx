import React from "react";
import { useDispatch } from "react-redux";
import { editSurvey } from "../../slices/surveySlice";
import { useSelector } from "react-redux";

function EditSurvey() {
	const dispatch = useDispatch();

	const survey = useSelector((state) => state.survey);

	function handleSurveyChange(e) {
		const surveyData = {
			title: e.target.id == "survey-title" ? e.target.value : survey.title,
			description:
				e.target.id == "survey-description"
					? e.target.value
					: survey.description,
		};
		dispatch(editSurvey(surveyData));
	}
	return (
		<div className="editor-edit-survey form-group">
			<label htmlFor="survey-title">Survey title</label>
			<input
				onChange={handleSurveyChange}
				type="text"
				id="survey-title"
				value={survey.title}
			/>
			<label htmlFor="survey-description">Survey description</label>
			<input
				onChange={handleSurveyChange}
				type="text"
				id="survey-description"
				value={survey.description}
			/>
		</div>
	);
}

export default EditSurvey;
