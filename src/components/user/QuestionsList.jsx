import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Question from "./Question";
import { insertSurveyResults } from "../../slices/surveySlice";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "./Loader";
function QuestionsList() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	const survey = useSelector((state) => state.survey);
	const questions = survey.questions;
	const [loader, setLoader] = useState(false);

	function handleFinishClick(e) {
		dispatch(insertSurveyResults(survey.answers));
		setLoader(true);
		setTimeout(function () {
			navigate("/");
		}, 1000);
	}

	return (
		<>
			<h1 className="survey-title">{survey.title}</h1>
			<p className="survey-description">{survey.description}</p>
			{questions.map((question, key) => {
				return <Question key={key} rownum={key + 1} question={question} />;
			})}
			{loader && <Loader />}
			{pathname != "/createsurvey" && (
				<div className="form-group ">
					<button className="btn btn-primary" onClick={handleFinishClick}>
						Finish
					</button>
				</div>
			)}
		</>
	);
}

export default QuestionsList;
