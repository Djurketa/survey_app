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

	return (
		<div className="editor-wrapper">
			<div className="editor-menu-wrapper">
				<div className="editor-buttons-wrapper">
					<button
						onClick={displayActiveMenu}
						className={`btn btn-primary ${
							activeMenu == "edit-survey" ? "active-menu-btn" : ""
						}`}
						data-active="edit-survey">
						Edit Survey
					</button>
					<button
						onClick={displayActiveMenu}
						className={`btn btn-primary ${
							activeMenu == "add-question" ? "active-menu-btn" : ""
						}`}
						data-active="add-question">
						Add Question
					</button>
					<button
						onClick={displayActiveMenu}
						className={`btn btn-primary ${
							activeMenu == "edit-question" ? "active-menu-btn" : ""
						}`}
						data-active="edit-question">
						Edit Question
					</button>
				</div>
				<div className="editor-content-wrapper">
					{activeMenu == "add-question" ? <AddQuestion /> : ""}
					{activeMenu == "edit-question" ? <EditQuestion /> : ""}
					{activeMenu == "edit-survey" ? <EditSurvey /> : ""}
					<div className="form-group ">
						{!survey.survey_id && survey.questions.length ? (
							<button onClick={handleSurveySave} className="btn btn-primary">
								Save
							</button>
						) : (
							""
						)}
						{survey.survey_id && survey.questions.length ? (
							<button onClick={handleSurveySave} className="btn btn-primary">
								Update
							</button>
						) : (
							""
						)}
					</div>
				</div>
			</div>
			<div className="survey-preview-wrapper" id="preview-weapper">
				<QuestionsList />
			</div>
		</div>
	);
}

export default SurveyEditor;
