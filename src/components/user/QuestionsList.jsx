import React from "react";
import { useSelector } from "react-redux";
import Question from "./Question";

function QuestionsList() {
	const survey = useSelector((state) => state.survey);
	const questions = survey.questions;
	return (
		<>
			<h1 className="survey-title">{survey.title}</h1>
			<p className="survey-description">{survey.description}</p>
			{questions.map((question, key) => {
				return <Question key={key} rownum={key + 1} question={question} />;
			})}
		</>
	);
}

export default QuestionsList;
