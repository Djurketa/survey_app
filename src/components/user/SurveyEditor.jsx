import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionsList from "./QuestionsList";
import EditQuestion from "./EditQuestion";
import EditSurvey from "./EditSurvey";
import AddQuestion from "./AddQuestion";
import { insertSurveysAsync } from "../../slices/surveySlice";

function SurveyEditor() {
	const dispatch = useDispatch();
	const [activeMenu, setActiveMenu] = useState("add-question");
	const survey = useSelector((state) => state.survey);

	function displayActiveMenu(e) {
		setActiveMenu(e.target.getAttribute("data-active"));
	}
	function handleSurveySave() {
		dispatch(insertSurveysAsync(survey));
	}
	function handleSurveyUpdate() {}

	return (
		<div className="editor-wrapper">
			<div className="editor-menu-wrapper">
				<div className="editor-buttons-wrapper">
					<button
						onClick={displayActiveMenu}
						className={`editor-btns ${
							activeMenu == "add-question" ? "active-menu-btn" : ""
						}`}
						data-active="add-question">
						Add Question
					</button>
					<button
						onClick={displayActiveMenu}
						className={`editor-btns ${
							activeMenu == "edit-question" ? "active-menu-btn" : ""
						}`}
						data-active="edit-question">
						Edit Question
					</button>
					<button
						onClick={displayActiveMenu}
						className={`editor-btns ${
							activeMenu == "edit-survey" ? "active-menu-btn" : ""
						}`}
						data-active="edit-survey">
						Edit Survey
					</button>
				</div>
				<div className="editor-content-wrapper">
					{activeMenu == "add-question" ? <AddQuestion /> : ""}
					{activeMenu == "edit-question" ? <EditQuestion /> : ""}
					{activeMenu == "edit-survey" ? <EditSurvey /> : ""}
					{!survey.survey_id ? (
						<button onClick={handleSurveySave} className="editor-btns save">
							SAVE
						</button>
					) : (
						""
					)}
					<button onClick={handleSurveySave} className="editor-btns edit">
						Update
					</button>
				</div>
			</div>
			<div className="survey-preview-wrapper">
				<h1 className="survey-title">{survey.title}</h1>
				<p className="survey-description">{survey.description}</p>
				<QuestionsList />
			</div>
		</div>
	);
}

export default SurveyEditor;
