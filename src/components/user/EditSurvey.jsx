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
			category_id:
				e.target.id == "category_id" ? e.target.value : survey.category_id,
		};
		dispatch(editSurvey(surveyData));
	}
	return (
		<div className="editor-edit-survey form-group">
			<label htmlFor="survey-title">Survey title</label>
			<input
				onClick={(e) => e.target.select()}
				onChange={handleSurveyChange}
				type="text"
				id="survey-title"
				value={survey.title}
			/>
			<label htmlFor="survey-description">Survey description</label>
			<input
				onClick={(e) => e.target.select()}
				onChange={handleSurveyChange}
				type="text"
				id="survey-description"
				value={survey.description}
			/>
			<label for="category">Choose a category:</label>
			<select onChange={handleSurveyChange} name="category" id="category_id">
				<option value="1" default>
					Politics
				</option>
				<option value="2">Culture</option>
				<option value="3">Sport</option>
				<option value="4">Health</option>
				<option value="5">Social</option>
				<option value="6">Religion</option>
				<option value="7">Education</option>
			</select>
		</div>
	);
}

export default EditSurvey;
